import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto, UserRoleDto, UsersRolesService, UsersService } from '../../../../../providers/api-client.generated';
import { AuthDataService } from '../../../../../services/auth-data.service';
import { BaseComponent } from '../../../../base/base.component';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditUsersComponent extends BaseComponent implements OnInit {
  user: UserDto;
  userRolesList: UserRoleDto[] = [];
  userId: string;
  editPassword = false;
  isNew = false;
  constructor(
    private userService: UsersService,
    private userRoleService: UsersRolesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    super();
    this.route.params.subscribe((params) => {
      this.userId = params.id;
    });
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.loading = true;
    console.log("🚀 ~ EditUsersComponent ~ init ~ this.user", this.userId);
    if (this.userId === 'new') {
      this.user = {} as any;
      this.isNew = true;
    }
    else {
      if (!this.GlobalAppService.userHasRole(AuthDataService.currentUser, this.RolesList.Admin) && this.userId !== AuthDataService.currentUser?.id)
        this.router.navigateByUrl('/' + this.RoutesList.AdminHome);
      const getUserResponse = await this.userService.getUser(this.userId).toPromise();
      if (!getUserResponse.success)
        this.openSnackBar(getUserResponse.message);
      this.user = getUserResponse.user;
      console.log("🚀 ~ EditUsersComponent ~ init ~ this.user", this.user);
    }
    const getUserRolesResponse = await this.userRoleService.getUserRoles().toPromise();
    if (!getUserRolesResponse.success)
      this.openSnackBar(getUserRolesResponse.message);
    this.userRolesList = getUserRolesResponse.userRoles;
    this.loading = false
  }

  async save() {
    await this.beforeSaveCheck();
    if (this.beforeSaveCheck().length)
      return console.table(this.beforeSaveCheck());
    // await this.checkDataFormat();
    const saveUserResponse = await this.userService.createOrUpdateUser(this.user).toPromise();
    if (!saveUserResponse.success)
      this.openSnackBar(saveUserResponse.message)
    this.openSnackBar("Utilisateur enregistré");
    this.router.navigateByUrl('/' + this.RoutesList.AdminUsers + '/' + saveUserResponse.user.id);
  }

  beforeSaveCheck() {
    const errors: string[] = [];
    if (!this.user.username)
      errors.push("Vous devez reseignez le nom d'utilisateur");
    if (!this.user.firstname)
      errors.push("Vous devez reseignez le prénom de l'utilisateur");
    if (!this.user.lastname)
      errors.push("Vous devez reseignez le nom de l'utilisateur");
    if (!this.user.mail)
      errors.push("Vous devez reseignez l'email de l'utilisateur");
    if (!this.user.phone)
      errors.push("Vous devez reseignez le téléphone de d'utilisateur");
    if (!this.user.roles)
      errors.push("Vous devez reseignez le rôle de l'utilisateur");
    return errors;
  }


  public openSnackBar(text: string) {
    this.snackBar.open(text, null, { direction: 'ltr', duration: 4000, horizontalPosition: 'center', verticalPosition: 'bottom' });
  }

  checkDataFormat() {
    if (this.user.phone) {
      const phoneRegex: RegExp = new RegExp('/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/gm');
      console.log("🚀 ~ EditUsersComponent ~ checkDataFormat ~ phoneRegex", phoneRegex);
      if (!phoneRegex.test(this.user.phone))
        this.openSnackBar("Le format du numéro de téléphone est incorrect");
    }
  }


  changePassword() {
    this.editPassword = true;
  }
}
