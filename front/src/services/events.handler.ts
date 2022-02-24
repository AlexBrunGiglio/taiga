import { fromEvent, Subject } from 'rxjs';
import { GenericResponse, LoginResponse } from '../providers/api-client.generated';

export interface HandleLoginResponseData {
    response: LoginResponse;
    fromRefreshToken: boolean;
    forceLogout: boolean;
}
export interface SnackbarNotificationPayload {
    actionName?: string;
    actionLabel?: string;
    url?: string;
    routerLink?: string;
    message: string;
    opts?: { duration?: number };
}


export class EventsHandler {
    public static isOnline: boolean = true;
    public static ConnectivityChanged: Subject<boolean> = new Subject<boolean>();
    public static ExpandOrCollapseMenuEvent = new Subject<void>();
    public static HandleLoginResponseEvent = new Subject<HandleLoginResponseData>();
    public static ForceLogoutEvent = new Subject<string>();
    public static AuthServiceInitialized = new Subject<void>();
    public static PageChanged = new Subject<void>();
    public static CandidateApplicationHasBeenSeen = new Subject<string>();
    public static NewCandidateApplication = new Subject<string>();
    public static MessageHasBeenSeen = new Subject<string>();
    public static NewMessage = new Subject<string>();
    public static init() {
        const onlineSub = fromEvent(window, "online").subscribe(() => {
            this.ConnectivityChanged.next(true);
            this.isOnline = true;
        });
    }
}