import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../utils/base/base.component';
import { accessToken } from '../utils/constant';
import { AuthDataService } from '../utils/services/auth-data.service';
import { AuthProvider } from '../utils/services/auth-provider';
import { LocalStorageService } from '../utils/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  title = 'Taiga Starter';
  constructor(
    private router: Router,
    private authProvider: AuthProvider,
  ) {
    super();
    this.initForBrowser();
  }


  private initForBrowser() {
    const accessTokenFromBrowser = LocalStorageService.getFromLocalStorage(accessToken);
    if (!accessTokenFromBrowser)
      this.router.navigate(['/login']);
    this.authProvider.getUserFromAccessToken(accessTokenFromBrowser as string, true);
    if (!AuthDataService.currentUser)
      this.router.navigate(['/login']);
  }
}
