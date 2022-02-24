import { UserDto, UserRoleDto } from '../../providers/api-client.generated';
import { SharedService } from '../../../../shared/shared-service';
export class GlobalAppService {
    static UserRolesList: UserRoleDto[] = [];

    public static userHasRole(user: UserDto, role: string) {
        return SharedService.userHasRole(user, role);
    }

    public static userHasOneOfRoles(user: UserDto, roles: string[]) {
        return SharedService.userHasOneOfRoles(user, roles);
    }

    public static userIsAdmin(user: UserDto) {
        return SharedService.userIsAdmin(user);
    }
}