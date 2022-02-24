import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotFoundComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
