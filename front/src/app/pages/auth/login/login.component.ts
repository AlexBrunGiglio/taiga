import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { accessToken } from '../../../../environments/constant';
import { AuthService, LoginViewModel, UsersService } from '../../../../providers/api-client.generated';
import { AuthDataService } from '../../../../services/auth-data.service';
import { BaseComponent } from '../../../base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../base/base-auth.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent extends BaseComponent implements OnInit {
  hide = true;
  loginViewModel: LoginViewModel;
  errorMsg: string;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    super();
    this.init()
  }

  ngOnInit() {
    if (AuthDataService.currentUser) {
      this.router.navigate(['/']);
      return;
    }
  }

  async init() {
    this.loginViewModel = {} as any;
  }

  async login() {
    if (!this.loginViewModel.username || !this.loginViewModel.password)
      return;
    this.loading = true;
    const loginResponse = await this.authService.login(this.loginViewModel).toPromise();
    if (!loginResponse.success) {
      this.errorMsg = loginResponse.message;
    } else {
      localStorage.setItem(accessToken, loginResponse.token);
      this.router.navigateByUrl('/' + this.RoutesList.AdminHome);
    }
    this.loading = false;
  }
}
