import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Like } from 'typeorm';
import { RolesList } from '../../../../shared/shared-constant';
import { BaseSearchRequest } from '../../common/base-search-request';
import { BaseController } from '../../common/base.controller';
import { AllowRoles } from '../../common/decorators/allow-roles.decorator';
import { ApiDocs } from '../../common/decorators/api.decorator';
import { UserLogged } from '../../common/decorators/user-logged.decorator';
import { GetStatResponse, GetStatsRequest, GetStatsResponse, StatDto } from './stat.dto';
import { Stat } from './stat.entity';
import { StatsService } from './stats.service';

@ApiTags('stats')
@Controller('stats')
export class StatsController extends BaseController {
    constructor(
        private readonly statsService: StatsService,
    ) {
        super();
    }
    @Get()
    @AllowRoles(RolesList.Admin)
    @ApiDocs({ summary: 'Get all stats', operationId: 'getAllStats', resStatus: HttpStatus.OK, resType: GetStatsResponse })
    async getAll(@Query() request: GetStatsRequest): Promise<GetStatsResponse> {
        const findOptions = BaseSearchRequest.getDefaultFindOptions<Stat>(request);
        if (request.search) {
            if (!findOptions.where)
                findOptions.where = [{}];
            findOptions.where = [{ label: Like('%' + request.search + '%') }];
        }
        return await this.statsService.findAll(findOptions);
    }

    @Get(':label')
    @UserLogged()
    @ApiDocs({ summary: 'Get stat', operationId: 'getStat', resStatus: HttpStatus.OK, resType: GetStatResponse })
    async get(@Param('label') label: string): Promise<GetStatResponse> {
        return await this.statsService.findOne({ where: { label: label } });
    }


    @Post()
    @AllowRoles(RolesList.Admin, RolesList.Visitor)
    @ApiDocs({ summary: 'Create or update stat', operationId: 'createOrUpdateStat', resStatus: HttpStatus.CREATED, resType: GetStatResponse })
    async createOrUpdate(@Body() stat: StatDto): Promise<GetStatResponse> {
        if (!stat)
            throw new BadRequestException('Invalid Request');
        return await this.statsService.createOrUpdate(stat);
    }
}