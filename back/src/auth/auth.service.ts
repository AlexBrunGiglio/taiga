import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../../shared/jwt-payload';
import { RolesList } from '../../../shared/shared-constant';
import { AppError, AppErrorWithMessage } from '../common/app-error';
import { GenericResponse } from '../common/generic-response';
import { MainHelpers } from '../common/main-helper';
import { Environment } from '../environment/environment';
import { MailsService } from '../modules/mails/mails.service';
import { UserRoleService } from '../modules/users/users-roles/user-roles.service';
import { UserDto } from '../modules/users/user.dto';
import { UsersService } from '../modules/users/users.service';
import { LoginResponse, LoginViewModel, RegisterRequest } from './auth-request';
import { bcrypt } from 'bcrypt';

interface TokenResponse {
  accesToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
    private userRoleService: UserRoleService,
    private mailService: MailsService,
  ) {}

  async register(request: RegisterRequest): Promise<LoginResponse> {
    const response: LoginResponse = new LoginResponse();
    if (!request.mail || !request.password)
      throw new BadRequestException(
        'Impossible de créer un compte sans adresse e-mail ou sans mot de passe.',
      );

    const userResponse = await this.userService.findOne({
      where: { mail: request.mail },
    });
    if (!userResponse.success) throw new AppError(userResponse.error);
    if (userResponse.user)
      throw new InternalServerErrorException(
        'Un compte mail existe déjà avec cette adresse e-mail !',
      );

    const user = new UserDto();
    user.mail = request.mail;
    user.username = request.username;
    user.password = request.password;
    user.firstname = request.firstName;
    user.lastname = request.lastName;
    user.imgUrl = '/assets/img/boy-1.png';

    user.roles = [];
    const getUserRoleResponse = await this.userRoleService.findAll();
    if (!getUserRoleResponse.success)
      throw new InternalServerErrorException(getUserRoleResponse.message);
    const roleToPush = getUserRoleResponse.userRoles.find(
      x => x.role === RolesList.Visitor,
    );
    user.roles.push(roleToPush);

    const newUser = await this.userService.createOrUpdate(user);
    if (!newUser.success)
      throw new InternalServerErrorException(newUser.message);
    const tokens = await this.generateToken(newUser.user);
    newUser.user.refreshToken = tokens?.refreshToken;
    response.token = tokens.accesToken;
    response.refreshToken = tokens.refreshToken;

    const updateUser = await this.userService.createOrUpdate(newUser.user);
    if (!updateUser.success)
      throw new InternalServerErrorException(updateUser.message);
    const sendMail = await this.sendEmailActivateAccount(newUser.user);
    if (!sendMail.success)
      throw new InternalServerErrorException(sendMail.message);

    response.success = true;

    return response;
  }

  async login(request: LoginViewModel): Promise<LoginResponse> {
    const response = new LoginResponse();
    if (!request.password || !request.username)
      throw new BadRequestException('Bad request');
    const findUserResponse = await this.userService.findOne(
      { where: { mail: request.username } },
      true,
    );
    if (!findUserResponse.success)
      throw new NotFoundException(findUserResponse.error);

    if (!findUserResponse.user)
      throw new NotFoundException('Utilisateur introuvable !');

    if (
      !(await MainHelpers.comparePasswords(
        request.password,
        findUserResponse.user.password,
      ))
    ) {
      throw new BadRequestException('Utilisateur ou mot de passe incorrect !');
    }

    if (findUserResponse.user.disabled) {
      throw new UnauthorizedException(
        'Votre compte a été archivé. Contacter un administrateur.',
      );
    }

    const tokens = await this.generateToken(findUserResponse.user);
    findUserResponse.user.refreshToken = tokens?.refreshToken;
    findUserResponse.user.password = request.password;

    const updateUser = await this.userService.createOrUpdate(
      findUserResponse.user,
    );
    if (!updateUser.success)
      throw new InternalServerErrorException(updateUser.message);

    response.token = tokens.accesToken;
    response.refreshToken = tokens.refreshToken;

    response.success = true;

    return response;
  }

  async logout(id: string): Promise<GenericResponse> {
    if (!id) throw new BadRequestException('No id founded');
    const response = new GenericResponse();
    const findUser = await this.userService.findOne({ where: { id: id } });
    if (!findUser.success)
      throw new InternalServerErrorException(findUser.message);

    findUser.user.refreshToken = null;

    const saveResponse = await this.userService.createOrUpdate(findUser.user);
    if (!saveResponse.success)
      throw new InternalServerErrorException(saveResponse.message);
    response.success = true;
    return response;
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = new LoginResponse();
    const user = this.jwtService.decode(refreshToken) as JwtPayload;
    if (!user.id) throw new BadRequestException('Bad request');
    const findUserResponse = await this.userService.findOne({
      where: { refreshToken: refreshToken },
    });
    if (!findUserResponse.success || !findUserResponse.user?.id)
      throw new ForbiddenException('Access denied');

    const tokens = await this.generateToken(findUserResponse.user);
    findUserResponse.user.refreshToken = tokens?.refreshToken;

    const saveResponse = await this.userService.createOrUpdate(
      findUserResponse.user,
    );
    if (!saveResponse.success)
      throw new InternalServerErrorException(saveResponse.message);

    response.refreshToken = tokens?.refreshToken;
    response.token = tokens.accesToken;
    response.success = true;
    return response;
  }

  // async refreshToken(request: Request): Promise<LoginResponse> {
  //     const response = new LoginResponse();
  //     try {
  //         let findUserResponse: GetUserResponse;
  //         const refreshTokenFromCookie = CookieHelpers.getCookie(request, refreshTokenLsKey);
  //         if (refreshTokenFromCookie) {
  //             findUserResponse = await this.userService.findOne({ where: { refreshToken: refreshTokenFromCookie } });
  //         }
  //         else {
  //             throw new AppError('Invalid request');
  //         }
  //         if (!findUserResponse.success)
  //             throw new AppError(findUserResponse.error);
  //         if (!findUserResponse.user)
  //             throw new AppErrorWithMessage('Utilisateur ou mot de passe incorrect !', 403);
  //         if (findUserResponse.user.disabled)
  //             throw new AppErrorWithMessage('Utilisateur désactivé. Impossible de se connecter', 403);
  //         await AuthCustomRules(findUserResponse.user);
  //         response.token = AuthToolsService.createUserToken(this.jwtService, findUserResponse.user);
  //         response.success = true;
  //     }
  //     catch (err) {
  //         response.handleError(err);
  //     }
  //     return response;
  // }

  async activateUserAccount(payloadId: string): Promise<GenericResponse> {
    const response = new GenericResponse();
    try {
      const findUser = await this.userService.findOne({
        where: { id: payloadId },
      });
      if (!findUser.success) throw new AppErrorWithMessage(findUser.message);

      const user = findUser.user;
      user.accountActivated = true;

      const saveResponse = await this.userService.createOrUpdate(user);
      if (!saveResponse.success)
        throw new AppErrorWithMessage(saveResponse.message);

      response.success = true;
    } catch (error) {
      response.handleError(error);
    }
    return response;
  }

  async sendEmailActivateAccount(user: UserDto): Promise<GenericResponse> {
    let response = new GenericResponse();
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const sendMailResponse = await this.mailService.sendUserConfirmation(
      user,
      token,
    );
    response = sendMailResponse;
    if (!response.success)
      throw new InternalServerErrorException(
        "L'email n'a pas pu être envoyé à l'utilisateur",
      );
    return response;
  }

  async generateToken(user: UserDto): Promise<TokenResponse> {
    if (!user) return null;
    let roles: string[] = [];
    if (user.roles) roles = user.roles.map(x => x.role);
    const userPayload: JwtPayload = {
      id: user.id,
      username: user.username,
      roles: roles,
      mail: user.mail,
      firstname: user.firstname,
      lastname: user.lastname,
      imgUrl: user.imgUrl,
      disabled: user.disabled,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(userPayload, {
        secret: Environment.access_token_secret,
        expiresIn: '1800s',
      }),
      this.jwtService.signAsync(userPayload, {
        secret: Environment.refresh_token_secret,
        expiresIn: '30d',
      }),
    ]);

    return {
      accesToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  validateUserFromToken(jwtToken: string) {
    if (!jwtToken) return;
    return this.jwtService.verify(jwtToken, {
      secret: Environment.access_token_secret,
    });
  }

  validateUserFromRefreshToken(jwtToken: string) {
    if (!jwtToken) return;
    return this.jwtService.verify(jwtToken, {
      secret: Environment.refresh_token_secret,
    });
  }
}
