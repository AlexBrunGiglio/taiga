import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../common/base.controller';
import { ApiDocs } from '../common/decorators/api.decorator';
import { GenericResponse } from '../common/generic-response';
import { LoginResponse, LoginViewModel, RegisterRequest } from './auth-request';
import { AuthService } from './auth.service';
import { AuthToolsService } from './services/tools.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController extends BaseController {
  constructor(
    private authService: AuthService,
    private authToolService: AuthToolsService,
  ) {
    super();
  }

  @Post('login')
  @ApiDocs({
    summary: "Connexion d'un utilisateur",
    operationId: 'login',
    resStatus: HttpStatus.OK,
    resType: LoginResponse,
  })
  async login(@Body() loginViewModel: LoginViewModel): Promise<LoginResponse> {
    return await this.authService.login(loginViewModel);
  }

  @Post('register')
  @ApiDocs({
    summary: "Inscription d'un utilisateur",
    operationId: 'register',
    resStatus: HttpStatus.CREATED,
    resType: LoginResponse,
  })
  async register(@Body() request: RegisterRequest): Promise<LoginResponse> {
    return await this.authService.register(request);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiDocs({
    summary: "Déconnexion d'un utilisateur",
    operationId: 'logout',
    resStatus: HttpStatus.OK,
    resType: GenericResponse,
  })
  async logout(): Promise<GenericResponse> {
    const payload = this.authToolService.getCurrentPayload(false);
    return await this.authService.logout(payload.id);
  }

  @Post('refreshToken/:token')
  @ApiDocs({
    summary: "Création d'un refresh token à partir d'un token",
    operationId: 'refreshToken',
    resStatus: HttpStatus.OK,
    resType: GenericResponse,
  })
  async refresh(
    @Param('token') refreshToken: string,
  ): Promise<GenericResponse> {
    return await this.authService.refreshToken(refreshToken);
  }

  @Patch('activate-account')
  @ApiDocs({
    summary: 'Activation du compte',
    operationId: 'activateAccount',
    resStatus: HttpStatus.CREATED,
    resType: GenericResponse,
  })
  async activateAccount(): Promise<GenericResponse> {
    const payload = this.checkUserPayload(this.authToolService);
    return await this.authService.activateUserAccount(payload.id);
  }
}
