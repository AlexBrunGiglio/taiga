import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from '../../../common/base.dto';
import { ChatDto } from '../chat.dto';

export class MessageDto extends BaseDto {
    @ApiProperty()
    content: string;
    @ApiProperty()
    userId: string;
    @ApiPropertyOptional({ type: () => ChatDto })
    chat?: ChatDto;
    @ApiProperty()
    chatId: string;
}