import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationBaseModelService } from '../../base/base-model.service';
import { GetStatResponse, GetStatsResponse, StatDto } from './stat-dto';
import { Stat } from './stat.entity';

@Injectable()
export class StatsService extends ApplicationBaseModelService<Stat, StatDto, GetStatResponse, GetStatsResponse> {
    constructor(
        @InjectRepository(Stat)
        public readonly repository: Repository<Stat>,
    ) {
        super();
        this.modelOptions = {
            getManyResponse: GetStatsResponse,
            getOneResponse: GetStatResponse,
            getManyResponseField: 'stats',
            getOneResponseField: 'stat',
            repository: this.repository,
            entity: Stat,
            archiveField: 'disabled',
            archiveFieldValue: true,
        };
    }
}