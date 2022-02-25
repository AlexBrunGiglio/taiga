import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TuiButtonModule, TuiDialogModule, TuiLoaderModule, TuiModeModule, TuiNotificationModule, TuiNotificationsModule, TuiRootModule, TuiThemeNightModule } from '@taiga-ui/core';
import { TuiActionModule, TuiInputModule, TuiInputPhoneInternationalModule, TuiInputPhoneModule } from '@taiga-ui/kit';
import { environment } from '../environments/environment';
import { BASE_PATH, Configuration, ConfigurationParameters } from '../providers/api-client.generated';

import { AppRoutingModule } from '../routes/app-routing.module';
import { AuthGuard } from '../routes/guards/auth.guard';
import { RoleGuard } from '../routes/guards/roles.guard';
import { HttpInterceptor } from '../utils/http-interceptor';
import { AuthProvider } from '../utils/services/auth-provider';
import { AppComponent } from './app.component';


export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    apiKeys: {},
    withCredentials: true,
  };
  return new Configuration(params);
}

export const BasePageModulesList = [
  CommonModule,
  ReactiveFormsModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiInputPhoneInternationalModule,
  FormsModule,
  TuiLoaderModule,
  TuiNotificationModule,
  TuiThemeNightModule,
  TuiModeModule,
  TuiDialogModule,
  TuiActionModule,
  TuiButtonModule,
  TuiNotificationsModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TuiRootModule,
    TuiNotificationsModule,
    TuiDialogModule,
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    AuthProvider,
    { provide: BASE_PATH, useValue: environment.apiBaseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
