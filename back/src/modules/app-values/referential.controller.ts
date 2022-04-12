import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RolesList } from "../../../../shared/shared-constant";
import { AppTypeDto, FindAppTypesRequest, GetAppTypeResponse, GetAppTypesResponse, GetTypeValuesRequest } from "./app-type.dto";
import { AppValueDto, GetAppValueResponse, MultipleAppValuesRequest } from "./app-value.dto";
import { BaseController } from "../../common/base.controller";
import { GenericResponse } from "../../common/generic-response";
import { ReferentialService } from "./referential.service";
import { UserLogged } from '../../common/decorators/user-logged.decorator';
import { ApiDocs } from '../../common/decorators/api.decorator';
import { AllowRoles } from '../../common/decorators/allow-roles.decorator';

@Controller('app-types')
@ApiTags('app-types')
export class ReferentialController extends BaseController {
    constructor(
        private referentialService: ReferentialService,
    ) {
        super();
    }

    @Get('getOneAppType/:id')
    @UserLogged()
    @ApiDocs({ summary: 'Get App Type', operationId: 'getOneAppType', resStatus: HttpStatus.OK, resType: GetAppTypeResponse })
    async getOneAppType(@Param('id') id: string): Promise<GetAppTypeResponse> {
        return await this.referentialService.getOneAppType(id);
    }

    @Get('getTypeValues')
    @UserLogged()
    @ApiDocs({ summary: 'Get values of a type', operationId: 'getTypeValues', resStatus: HttpStatus.OK, resType: GetAppTypeResponse })
    async getTypeValues(@Query() request: GetTypeValuesRequest): Promise<GetAppTypeResponse> {
        return await this.referentialService.getTypeValues(request);
    }

    @Get('getMultipleTypeValues')
    @UserLogged()
    @ApiDocs({ summary: 'Get multiple values of a type', operationId: 'getMultipleTypeValues', resStatus: HttpStatus.OK, resType: GetAppTypesResponse })
    async getMultipleTypeValues(@Query() request: FindAppTypesRequest): Promise<GetAppTypesResponse> {
        return await this.referentialService.getMultipleTypeValues(request);
    }

    @Post('insertOrUpdateAppValue')
    @AllowRoles(RolesList.Admin)
    @ApiDocs({ summary: 'insert or update App Value', operationId: 'insertOrUpdateAppValue', resStatus: HttpStatus.CREATED, resType: GetAppValueResponse })
    async insertOrUpdateAppValue(@Body() appValueDto: AppValueDto): Promise<GetAppValueResponse> {
        return await this.referentialService.insertOrUpdateAppValue(appValueDto);
    }

    @Post('insertOrUpdateAppType')
    @AllowRoles(RolesList.Admin)
    @ApiDocs({ summary: 'insert or update App Type', operationId: 'insertOrUpdateAppType', resStatus: HttpStatus.CREATED, resType: GetAppTypeResponse })
    async insertOrUpdateAppType(@Body() appTypeDto: AppTypeDto): Promise<GetAppTypeResponse> {
        return await this.referentialService.insertOrUpdateAppType(appTypeDto, true, true);
    }

    @Delete('removeAppValues')
    @AllowRoles(RolesList.Admin)
    @ApiDocs({ summary: 'remove App Values', operationId: 'removeAppValues', resStatus: HttpStatus.OK, resType: GenericResponse })
    async removeAppValues(@Body() request: MultipleAppValuesRequest): Promise<GenericResponse> {
        return await this.referentialService.removeAppValues(request.ids, request.codes);
    }

    @Patch('disableAppValues')
    @AllowRoles(RolesList.Admin)
    @ApiDocs({ summary: 'disable App Values', operationId: 'disableAppValues', resStatus: HttpStatus.OK, resType: GenericResponse })
    async disableAppValues(@Body() request: MultipleAppValuesRequest): Promise<GenericResponse> {
        let response = new GenericResponse();
        try {
            response = await this.referentialService.disableAppValues(request.ids, request.codes);
        }
        catch (err) {
            response.handleError(err);
        }
        return response;
    }
}