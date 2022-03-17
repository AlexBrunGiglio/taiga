import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { refreshTokenLsKey, RolesList } from "../../../shared/shared-constant";
import { AppError, AppErrorWithMessage } from "../base/app-error";
import { GenericResponse } from "../base/generic-response";
import { MainHelpers } from "../base/main-helper";
import { UserRoleService } from '../modules/users-roles/user-roles.service';
import { GetUserResponse, UserDto } from "../modules/users/user-dto";
import { UsersService } from "../modules/users/users.service";
import { LoginResponse, LoginViewModel, RegisterRequest } from "./auth-request";
import { CookieHelpers } from "./cookie-helper";
import { AuthCustomRules, AuthToolsService } from "./services/tools.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private readonly jwtService: JwtService,
        private userRoleService: UserRoleService,
    ) {

    }

    async validateUser(username: string, pass: string): Promise<any> {
        const userResponse = await this.userService.findOne({ where: { username: username } });
        if (!userResponse.success)
            throw new AppErrorWithMessage('Unable to find this user');
        else {
            if (userResponse.user?.password === pass) {
                const { password, ...result } = userResponse.user;
                return result
            }
            return null;
        }
    }

    async register(request: RegisterRequest): Promise<GenericResponse> {
        let response: GenericResponse = new GenericResponse();
        try {
            if (!request.mail || !request.password)
                throw new AppErrorWithMessage('Impossible de créer un compte sans adresse e-mail ou sans mot de passe.');

            const userResponse = await this.userService.findOne({ where: { mail: request.mail, } });
            if (!userResponse.success)
                throw new AppError(userResponse.error);
            if (userResponse.user)
                throw new AppErrorWithMessage('Un compte mail existe déjà avec cette adresse e-mail !');

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
                throw new AppErrorWithMessage(getUserRoleResponse.message);
            const roleToPush = getUserRoleResponse.userRoles.find(x => x.role === RolesList.Visitor);
            user.roles.push(roleToPush);
            const createUserResponse = await this.userService.createOrUpdate(user);
            response = createUserResponse;
            response.token = AuthToolsService.createUserToken(this.jwtService, createUserResponse.user);
        }
        catch (err) {
            response.handleError(err);
        }
        return response;
    }

    async login(loginViewModel: LoginViewModel): Promise<LoginResponse> {
        const response = new LoginResponse();
        try {
            if (!loginViewModel.password || !loginViewModel.username)
                throw AppError.getBadRequestError();
            const findUserResponse = await this.userService.findOne({ where: { mail: loginViewModel.username } }, true);
            if (!findUserResponse.success)
                throw new AppError(findUserResponse.error);

            if (!findUserResponse.user)
                throw new AppErrorWithMessage('Utilisateur introuvable !', 403);

            if (!await MainHelpers.comparePasswords(loginViewModel.password, findUserResponse.user.password)) {
                throw new AppErrorWithMessage('Utilisateur ou mot de passe incorrect !', 403);
            }

            if (findUserResponse.user.disabled) {
                throw new AppErrorWithMessage('Votre compte a été archivé. Contacter un administrateur.', 403);
            }
            response.token = AuthToolsService.createUserToken(this.jwtService, findUserResponse.user);
            response.success = true;
        }
        catch (err) {
            response.handleError(err);
        }
        return response;
    }

    async refreshToken(request: Request): Promise<LoginResponse> {
        const response = new LoginResponse();
        try {
            let findUserResponse: GetUserResponse;
            const refreshTokenFromCookie = CookieHelpers.getCookie(request, refreshTokenLsKey);
            if (refreshTokenFromCookie) {
                findUserResponse = await this.userService.findOne({ where: { refreshToken: refreshTokenFromCookie } });
            }
            else {
                throw new AppError('Invalid request');
            }
            if (!findUserResponse.success)
                throw new AppError(findUserResponse.error);
            if (!findUserResponse.user)
                throw new AppErrorWithMessage('Utilisateur ou mot de passe incorrect !', 403);
            if (findUserResponse.user.disabled)
                throw new AppErrorWithMessage('Utilisateur désactivé. Impossible de se connecter', 403);
            await AuthCustomRules(findUserResponse.user);
            response.token = AuthToolsService.createUserToken(this.jwtService, findUserResponse.user);
            response.success = true;
        }
        catch (err) {
            response.handleError(err);
        }
        return response;
    }
}