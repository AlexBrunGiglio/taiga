import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../utils/base/base.component';
import { accessToken } from '../utils/constant';
import { AuthDataService } from '../utils/services/auth-data.service';
import { AuthProvider } from '../utils/services/auth-provider';
import { LocalStorageService } from '../utils/services/local-storage.service';

export var gobalNightMode: boolean;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
    this.authProvider.getUserFromAccessToken(accessTokenFromBrowser as string, true);
    const nightMode = LocalStorageService.getFromLocalStorage('night-mode');
    if (nightMode) {
      gobalNightMode = true;
      // this.addDarkTheme();
    }
  }
}
