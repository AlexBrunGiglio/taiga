import { Body, Controller, HttpCode, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtPayload } from '../../../shared/jwt-payload';
import { AppErrorWithMessage } from '../base/app-error';
import { BaseController } from "../base/base.controller";
import { GenericResponse } from "../base/generic-response";
import { UserDto } from '../modules/users/user-dto';
import { LoginResponse, LoginViewModel, RegisterRequest } from "./auth-request";
import { AuthService } from "./auth.service";
import { AuthToolsService } from './services/tools.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController extends BaseController {
    constructor(
        private authService: AuthService,
        private authToolsService: AuthToolsService,
    ) {
        super();
    }

    @Post('login')
    @ApiOperation({ summary: 'Connexion d\'un utilisateur', operationId: 'login' })
    @ApiResponse({ status: 200, description: 'Login response', type: LoginResponse })
    @HttpCode(200)
    async login(@Body() loginViewModel: LoginViewModel): Promise<LoginResponse> {
        const response = await this.authService.login(loginViewModel);
        return response;
    }

    @Post('register')
    @ApiOperation({ summary: 'Inscription d\'un utilisateur', operationId: 'register' })
    @ApiResponse({ status: 200, description: 'Generic Response', type: GenericResponse })
    @HttpCode(200)
    @ApiBearerAuth()
    async register(@Body() request: RegisterRequest): Promise<GenericResponse> {
        return await this.authService.register(request);
    }

    @Post(':refreshToken/token')
    @ApiOperation({ summary: 'Création d\'un refresh token à partir d\'un token', operationId: 'refreskToken' })
    @ApiResponse({ status: 200, description: 'Création d\'un refresh token', type: GenericResponse })
    @HttpCode(200)
    async refreshToken(@Param('refreshToken') refreshToken: string): Promise<GenericResponse> {
        const response = new GenericResponse();
        try {
            if (!refreshToken)
                throw new AppErrorWithMessage("No token provided");
            const userFromPayload: JwtPayload = this.authService.validateUserFromRefreshToken(refreshToken);
            if (!userFromPayload.id)
                throw new AppErrorWithMessage("Utilisateur inexistant.");
            if (userFromPayload.disabled)
                throw new AppErrorWithMessage("Utilisateur désactivé.");

            userFromPayload.iat = null;
            userFromPayload.exp = null;
            const user: UserDto = userFromPayload as any;
            response.token = this.authService.generateAccessToken(user);
            response.success = true;
        } catch (error) {
            response.handleError(error)
        }
        return response;
    }

    @Post('activate-account')
    @ApiOperation({ summary: 'Activation du compte', operationId: 'activateAccount' })
    @ApiResponse({ status: 200, description: 'Activate Account', type: GenericResponse })
    @HttpCode(200)
    async activateAccount(): Promise<GenericResponse> {
        const payload = this.authToolsService.getCurrentPayload(false);
        if (!payload.id)
            throw new AppErrorWithMessage('Une erreur est survenue !')
        return await this.authService.activateUserAccount(payload.id);
    }
}
