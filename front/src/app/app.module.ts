import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TuiButtonModule, TuiDialogModule, TuiHintModule, TuiLabelModule, TuiLoaderModule, TuiModeModule, TuiNotificationModule, TuiNotificationsModule, TuiPrimitiveTextfieldModule, TuiRootModule, TuiThemeNightModule } from '@taiga-ui/core';
import { TuiActionModule, TuiInputModule, TuiInputPhoneInternationalModule, TuiInputPhoneModule, TuiLineClampModule, TuiMultiSelectModule, TuiSelectModule, TuiTextAreaModule } from '@taiga-ui/kit';
import { environment } from '../environments/environment';
import { ApiModule, BASE_PATH, Configuration, ConfigurationParameters } from '../providers/api-client.generated';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../routes/app-routing.module';
import { AuthGuard } from '../routes/guards/auth.guard';
import { RoleGuard } from '../routes/guards/roles.guard';
import { CustomHttpInterceptor } from '../utils/http-interceptor';
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
  FormsModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiInputPhoneInternationalModule,
  TuiLoaderModule,
  TuiNotificationModule,
  TuiThemeNightModule,
  TuiModeModule,
  TuiDialogModule,
  TuiActionModule,
  TuiButtonModule,
  TuiPrimitiveTextfieldModule,
  TuiTextAreaModule,
  TuiLabelModule,
  TuiLineClampModule,
  TuiMultiSelectModule,
  TuiSelectModule,
  TuiHintModule,
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TuiRootModule,
    TuiDialogModule,
    ReactiveFormsModule,
    FormsModule,
    ApiModule.forRoot(apiConfigFactory),
    TuiThemeNightModule,
    TuiModeModule,
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    AuthProvider,
    { provide: BASE_PATH, useValue: environment.apiBaseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
