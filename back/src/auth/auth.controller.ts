import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BaseController } from "../common/base.controller";
import { GenericResponse } from "../common/generic-response";
import { LoginResponse, LoginViewModel, RegisterRequest } from "./auth-request";
import { AuthService } from "./auth.service";
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
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Connexion d\'un utilisateur', operationId: 'login' })
    @ApiResponse({ status: 200, type: LoginResponse })
    async login(@Body() loginViewModel: LoginViewModel): Promise<LoginResponse> {
        return await this.authService.login(loginViewModel);;
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Inscription d\'un utilisateur', operationId: 'register' })
    @ApiResponse({ status: 200, type: LoginResponse })
    async register(@Body() request: RegisterRequest): Promise<LoginResponse> {
        return await this.authService.register(request);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Déconnexion d\'un utilisateur', operationId: 'logout' })
    @ApiResponse({ status: 200, type: GenericResponse })
    async logout(): Promise<GenericResponse> {
        const payload = this.authToolService.getCurrentPayload(false);
        return await this.authService.logout(payload.id);
    }


    @Post('refreshToken/:token')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Création d\'un refresh token à partir d\'un token', operationId: 'refreshToken' })
    @ApiResponse({ status: 200, type: GenericResponse })
    async refresh(@Param('token') refreshToken: string): Promise<GenericResponse> {
        return await this.authService.refreshToken(refreshToken);
    }

    @Post('activate-account')
    @ApiOperation({ summary: 'Activation du compte', operationId: 'activateAccount' })
    @ApiResponse({ status: 200, description: 'Activate Account', type: GenericResponse })
    // @HttpCode(200)
    async activateAccount(): Promise<GenericResponse> {
        const payload = this.authToolService.getCurrentPayload(false);
        if (!payload.id)
            throw new BadRequestException('Une erreur est survenue !')
        return await this.authService.activateUserAccount(payload.id);
    }
}
