import { Component, OnInit } from '@angular/core';
import { UserDto, UserRoleDto, UsersRolesService, UsersService } from '../../../../../providers/api-client.generated';
import { DialogService } from '../../../../../services/dialog.service';
import { BaseComponent, BaseRequest } from '../../../../base/base.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss', '../../../../base/base-list.scss']
})
export class UsersListComponent extends BaseComponent implements OnInit {
  users: UserDto[];
  constructor(
    private userService: UsersService,
    private userRoleService: UsersRolesService,
    private dialogService: DialogService,
  ) {
    super();
    this.init();
  }

  ngOnInit(): void {
  }

  async init() {
    await this.loadUsers();
  }

  async loadUsers() {
    this.loading = true;
    const getUsersResponse = await this.userService.getAllUsers(null, null, null, null, this.request.search).toPromise();
    if (!getUsersResponse.success)
      return console.warn(getUsersResponse.message);
    this.users = getUsersResponse.users;
    this.loading = false;
  }
}
