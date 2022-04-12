import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/users.module';
import { Stat } from './stat.entity';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Stat])],
  controllers: [StatsController],

  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
