import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { DatabaseService } from './common/database.service';
import { Environment } from './environment/environment';
import { AppValuesModule } from './modules/app-values/app-values.module';
import { FilesModule } from './modules/files/files.module';
import { LogsModule } from './modules/logs/logs.module';
import { MailModule } from './modules/mails/mails.module';
import { StatsModule } from './modules/stats/stats.module';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: Environment.db_host,
      port: 3306,
      username: Environment.db_user,
      password: Environment.db_password,
      database: Environment.db_name,
      logging: Environment.db_log_enabled,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: { timezone: 'utc' },
    }),
    AuthModule,
    UserModule,
    StatsModule,
    ScheduleModule.forRoot(),
    MailModule,
    FilesModule,
    LogsModule,
    AppValuesModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {
  constructor(
    private connection: Connection,
    private dbService: DatabaseService,
  ) {
    this.init();
    this.connection.subscribers.push();
  }

  private async init() {
    await this.dbService.seedDB();
    console.log('\x1b[34m', '[Nest] Server started on port 3088');
  }
}
