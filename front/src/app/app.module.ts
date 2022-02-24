import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ApiModule, BASE_PATH, Configuration, ConfigurationParameters } from '../providers/api-client.generated';
import { AuthGuard } from './routes/guards/auth-guard';
import { RoleGuard } from './routes/guards/role-guard';
import { HttpInterceptor } from '../providers/http-interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthProvider } from '../services/auth-provider';
import { DialogService } from '../services/dialog.service';
import { MatTabsModule } from '@angular/material/tabs';

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
    apiKeys: {},
    withCredentials: true,
  };
  return new Configuration(params);
}

export const BasePageModulesList = [
  CommonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatPaginatorModule,
  FormsModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatTabsModule,
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ApiModule.forRoot(apiConfigFactory),
    RouterModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    AuthProvider,
    DialogService,
    { provide: BASE_PATH, useValue: environment.apiBaseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
