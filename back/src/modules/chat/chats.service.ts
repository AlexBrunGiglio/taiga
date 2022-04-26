import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationBaseModelService } from '../../common/base-model.service';
import { ChatDto, GetChatResponse, GetChatsResponse } from './chat.dto';
import { Chat } from './chat.entity';

@Injectable()
export class ChatsService extends ApplicationBaseModelService<
Chat,
ChatDto,
GetChatResponse,
GetChatsResponse
> {
    constructor(
        @InjectRepository(Chat)
        public readonly repository: Repository<Chat>,
    ) {
        super();
        this.modelOptions = {
            getManyResponse: GetChatsResponse,
            getOneResponse: GetChatResponse,
            getManyResponseField: 'chats',
            getOneResponseField: 'chat',
            repository: this.repository,
            entity: Chat,
            archiveField: 'disabled',
            archiveFieldValue: true,
        };
    }
}
