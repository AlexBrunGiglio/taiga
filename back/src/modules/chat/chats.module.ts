import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatsController } from './chats.controller';
import { ChatGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { Message } from './messages/message.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [Message, Chat],
        ),
    ],
    controllers: [ChatsController],
    providers: [ChatGateway, ChatsService],
    exports: [ChatsService]
})
export class ChatModule { }