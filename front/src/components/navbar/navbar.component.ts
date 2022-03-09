import { animate, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TuiHostedDropdownComponent } from '@taiga-ui/core';
import { RoutesList } from '../../routes/routes';
import { AuthDataService } from '../../utils/services/auth-data.service';
import { AuthProvider } from '../../utils/services/auth-provider';
import { GlobalAppService } from '../../utils/services/global.service';

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
    GlobalAppService = GlobalAppService;
    @Input() showMenuInput = true;
    @Input() showMenuAdminInput = false;
    showMenuAdminVar = false;
    @Input() title = 'Taiga Starter';
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
    nightMode = false;
    elem: any;
    isFullScreen = false;

    constructor(
        private route: Router,
        private authProvider: AuthProvider,
        @Inject(DOCUMENT) private document: any,
    ) {
    }

    ngOnInit() {
        this.chkScreenMode();
        this.elem = document.documentElement;
    }
    @HostListener('document:fullscreenchange', ['$event'])
    @HostListener('document:webkitfullscreenchange', ['$event'])
    @HostListener('document:mozfullscreenchange', ['$event'])
    @HostListener('document:MSFullscreenChange', ['$event'])

    showMenu() {
        this.showMenuVar = !this.showMenuVar;
    }
    showMenuAdmin() {
        this.showMenuAdminVar = !this.showMenuAdminVar;
    }

    onClick() {
        this.open = false;

        if (this.component && this.component.nativeFocusableElement) {
            this.component.nativeFocusableElement.focus();
        }
    }

    logout() {
        this.authProvider.logout();
        this.route.navigate([RoutesList.Home]);
    }

    fullscreenmodes() {
        this.chkScreenMode();
    }
    chkScreenMode() {
        if (document.fullscreenElement) {
            //fullscreen
            this.isFullScreen = true;
        } else {
            //not in full screen
            this.isFullScreen = false;
        }
    }
    openFullscreen() {
        if (this.elem.requestFullscreen) {
            this.elem.requestFullscreen();
        } else if (this.elem.mozRequestFullScreen) {
            /* Firefox */
            this.elem.mozRequestFullScreen();
        } else if (this.elem.webkitRequestFullscreen) {
            /* Chrome, Safari and Opera */
            this.elem.webkitRequestFullscreen();
        } else if (this.elem.msRequestFullscreen) {
            /* IE/Edge */
            this.elem.msRequestFullscreen();
        }
        this.showMenuVar = false;
        this.isFullScreen = true;
    }
    /* Close fullscreen */
    closeFullscreen() {
        if (this.document.exitFullscreen) {
            this.document.exitFullscreen();
        } else if (this.document.mozCancelFullScreen) {
            /* Firefox */
            this.document.mozCancelFullScreen();
        } else if (this.document.webkitExitFullscreen) {
            /* Chrome, Safari and Opera */
            this.document.webkitExitFullscreen();
        } else if (this.document.msExitFullscreen) {
            /* IE/Edge */
            this.document.msExitFullscreen();
        }
        this.showMenuVar = false;
        this.isFullScreen = false;
    }

}