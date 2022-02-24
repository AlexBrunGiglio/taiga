import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../../base/base-auth.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
