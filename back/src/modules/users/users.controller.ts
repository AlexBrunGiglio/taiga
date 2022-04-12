import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, Param, Post, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../common/base.controller';
import { Roles } from '../../common/services/roles.decorator';
import { GetUserResponse, GetUsersRequest, GetUsersResponse, UserDto } from './user.dto';
import { UsersService } from './users.service';
import { RolesList } from '../../../../shared/shared-constant';
import { AppErrorWithMessage } from '../../common/app-error';
import { GenericResponse } from '../../common/generic-response';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AuthToolsService } from '../../auth/services/tools.service';
import { BaseSearchRequest } from '../../common/base-search-request';
import { User } from './user.entity';
import { Like } from 'typeorm';
import { SharedService } from '../../../../shared/shared-service';
import { AllowRoles } from '../../common/decorators/allow-roles.decorator';
import { ApiDocs } from '../../common/decorators/api.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController extends BaseController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authToolsService: AuthToolsService,

    ) {
        super();
    }
    @Get()
    @AllowRoles(RolesList.Admin)
    @ApiDocs({ summary: 'Get all users', operationId: 'getAllUsers', resStatus: HttpStatus.OK, resType: GetUsersResponse })
    async getAll(@Query() request: GetUsersRequest): Promise<GetUsersResponse> {
        const findOptions = BaseSearchRequest.getDefaultFindOptions<User>(request);
        if (request.search) {
            if (!findOptions.where)
                findOptions.where = [{}];
            findOptions.where = [
                {
                    firstname: Like('%' + request.search + '%'),
                },
                {
                    lastname: Like('%' + request.search + '%'),
                },
            ];
        }
        return await this.usersService.findAll(findOptions);
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user', operationId: 'getUser' })
    @ApiResponse({ status: HttpStatus.OK, type: GetUserResponse })
    @HttpCode(HttpStatus.OK)
    async get(@Param('id') id: string): Promise<GetUserResponse> {
        const payload = this.authToolsService.getCurrentPayload(false);
        if (!payload?.id)
            throw new UnauthorizedException('Vous n\'avez pas l\'autorisation de faire cela.');

        if (!SharedService.userIsAdmin(payload) && payload.id !== id)
            throw new UnauthorizedException('Vous n\'avez pas l\'autorisation de faire cela.');

        let getUserResponse = new GetUserResponse();
        getUserResponse = await this.usersService.findOne({ where: { id: id } });
        if (!getUserResponse.success || !getUserResponse.user?.id)
            throw new ForbiddenException('Vous n\'avez pas l\'autorisation de faire cela.');
        return getUserResponse;
    }

    @UseGuards(RolesGuard)
    @Roles(RolesList.Admin, RolesList.Visitor)
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create or update user', operationId: 'createOrUpdateUser' })
    @ApiResponse({ status: HttpStatus.CREATED, type: GetUserResponse })
    @HttpCode(HttpStatus.CREATED)
    async createOrUpdate(@Body() userDto: UserDto): Promise<GetUserResponse> {
        let getUserResponse = new GetUserResponse();
        try {
            if (!userDto)
                throw new AppErrorWithMessage('Invalid Request');
            const payload = this.authToolsService.getCurrentPayload(false);
            if (!SharedService.userIsAdmin(payload) && payload.id !== userDto.id)
                throw new AppErrorWithMessage('Vous n\'avez pas l\'autorisation de faire cela.', 403);
            getUserResponse = await this.usersService.createOrUpdate(userDto);
        } catch (error) {
            getUserResponse.handleError(error);
        }
        return getUserResponse;
    }

    @UseGuards(RolesGuard)
    @Roles(RolesList.Admin)
    @Delete()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete users', operationId: 'deleteUsers' })
    @ApiResponse({ status: HttpStatus.OK, type: GenericResponse })
    @HttpCode(HttpStatus.OK)
    async deleteUsers(@Query('userIds') userIds: string): Promise<GenericResponse> {
        console.log("🚀 ~ UsersController ~ deleteUsers ~ userIds", userIds);
        let response = new GenericResponse();
        try {
            response = await this.usersService.delete(userIds.split(','));
        } catch (error) {
            response.handleError(error);
        }
        console.log("🚀 ~ UsersController ~ deleteUsers ~ response", response);
        return response;
    }

    @UseGuards(RolesGuard)
    @Roles(RolesList.Admin)
    @Post('archiveUsers')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Archive user', operationId: 'archiveUsers' })
    @ApiResponse({ status: HttpStatus.OK, type: GenericResponse })
    @HttpCode(HttpStatus.OK)
    async archiveUsers(@Query('userIds') userIds: string): Promise<GenericResponse> {
        return await this.usersService.archive(userIds.split(','));
    }

    @UseGuards(RolesGuard)
    @Roles(RolesList.Visitor)
    @Post('archiveMyAccount')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Archive my account', operationId: 'archiveMyAccount' })
    @ApiResponse({ status: HttpStatus.OK, type: GenericResponse })
    @HttpCode(HttpStatus.OK)
    async archiveMAccount(): Promise<GenericResponse> {
        let response = new GenericResponse();
        try {
            const payload = this.authToolsService.getCurrentPayload(false);
            if (!payload.id)
                throw new AppErrorWithMessage('Une erreur est survenue !');
            response = await this.usersService.archiveOne(payload.id);
        } catch (error) {
            response.handleError(error);
        }
        return response;
    }

    @UseGuards(RolesGuard)
    @Roles(RolesList.Visitor)
    @Delete('deleteMyAccount')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete account', operationId: 'deleteAccount' })
    @ApiResponse({ status: HttpStatus.OK, type: GenericResponse })
    @HttpCode(HttpStatus.OK)
    async deleteAccount(): Promise<GenericResponse> {
        let response = new GenericResponse();
        try {
            const payload = this.authToolsService.getCurrentPayload(false);
            if (!payload.id)
                throw new AppErrorWithMessage('Une erreur est survenue !');
            response = await this.usersService.deleteOne(payload.id);
        } catch (error) {
            response.handleError(error);
        }
        return response;
    }
}