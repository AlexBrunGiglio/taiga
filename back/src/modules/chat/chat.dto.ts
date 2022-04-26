import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseSearchRequest } from '../../common/base-search-request';
import { BaseDto } from '../../common/base.dto';
import { GenericResponse } from '../../common/generic-response';
import { BaseSearchResponse } from '../../common/search-response';
import { UserDto } from '../users/user.dto';
import { MessageDto } from './messages/message.dto';

export class ChatDto extends BaseDto {
    @ApiPropertyOptional({ type: () => MessageDto, isArray: true })
    messages?: MessageDto[];

    @ApiPropertyOptional({ type: () => UserDto, isArray: true })
    users?: UserDto[];
}

export class GetChatResponse extends GenericResponse {
    @ApiProperty({ type: () => ChatDto })
    chat: ChatDto;
}

export class GetChatsResponse extends BaseSearchResponse {
    @ApiProperty({ type: () => ChatDto, isArray: true })
    chats: ChatDto[] = [];
}

export class GetChatRequest extends BaseSearchRequest {
    @ApiPropertyOptional({ description: 'Users separated by comma' })
    userIds?: string;
}