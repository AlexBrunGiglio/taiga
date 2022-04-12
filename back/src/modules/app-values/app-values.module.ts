import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppType } from './app-type.entity';
import { AppValue } from './app-value.entity';
import { ReferentialController } from './referential.controller';
import { ReferentialService } from './referential.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AppValue, AppType])],
  controllers: [ReferentialController],
  providers: [ReferentialService],
  exports: [ReferentialService],
})
export class AppValuesModule {}
