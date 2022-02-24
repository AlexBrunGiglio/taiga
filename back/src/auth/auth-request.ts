import { ApiProperty } from "@nestjs/swagger";
import { GenericResponse } from "../base/generic-response";

export class RegisterRequest {
    @ApiProperty({ description: "user email", type: String })
    mail: string;
    @ApiProperty({ description: "user password", type: String })
    password: string;
    @ApiProperty({ description: "user username", type: String, })
    username: string;
}

export class LoginViewModel {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
}
export class LoginResponse extends GenericResponse {
    @ApiProperty()
    refreshToken: string;
}