import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TuiHostedDropdownComponent } from '@taiga-ui/core';
import { RoutesList } from '../../routes/routes';
import { AuthDataService } from '../../utils/services/auth-data.service';

const widthC = '400px';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger(
            'inOutAnimation',
            [
                transition(
                    ':enter',
                    [
                        style({ width: 0 }),
                        animate('500ms ease-out',
                            style({ width: widthC }))
                    ]
                ),
                transition(
                    ':leave',
                    [
                        style({ width: widthC }),
                        animate('500ms ease-in',
                            style({ width: 0 }))
                    ]
                )
            ]
        )
    ]
})
export class NavbarComponent implements OnInit {
    showMenuVar = false;
    @ViewChild(TuiHostedDropdownComponent)
    component?: TuiHostedDropdownComponent;
    public authDataService = AuthDataService;
    RoutesList = RoutesList;
    readonly routes = [
        {
            label: 'Profil',
            path: this.RoutesList.Profile,
        },
        {
            label: 'Paramètres',
            path: this.RoutesList.Settings,
        },
    ];
    open = false;
    constructor(
        private route: Router,
    ) {
    }

    ngOnInit() {
        //
    }

    showMenu() {
        this.showMenuVar = !this.showMenuVar;
    }

    onClick() {
        this.open = false;

        if (this.component && this.component.nativeFocusableElement) {
            this.component.nativeFocusableElement.focus();
        }
    }
}