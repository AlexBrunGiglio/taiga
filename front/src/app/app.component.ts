import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
export class AppComponent extends BaseComponent implements OnInit {
  title = 'Starter';
  constructor(
    private router: Router,
    private authProvider: AuthProvider,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForBrowser();
  }

  private initForBrowser() {
    const accessTokenFromBrowser = LocalStorageService.getFromLocalStorage(accessToken);
    this.authProvider.getUserFromAccessToken(accessTokenFromBrowser as string, true);
  }
}
