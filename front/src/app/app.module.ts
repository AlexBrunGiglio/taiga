import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TuiDialogModule, TuiNotificationsModule, TuiRootModule } from '@taiga-ui/core';

import { AppRoutingModule } from '../routes/app-routing.module';
import { AppComponent } from './app.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
