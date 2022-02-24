import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../../../base/base-auth.scss']
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
