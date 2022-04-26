import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRole } from './users-roles/user-role.entity';
import { UsersRolesController } from './users-roles/user-roles.controller';
import { UserRoleService } from './users-roles/user-roles.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole])],
  controllers: [UsersController, UsersRolesController],

  providers: [UsersService, UserRoleService],
  exports: [UsersService, UserRoleService],
})
export class UserModule { }
