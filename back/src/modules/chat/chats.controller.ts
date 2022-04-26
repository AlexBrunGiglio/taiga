import { Body, Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesList } from '../../../../shared/shared-constant';
import { BaseSearchRequest } from '../../common/base-search-request';
import { BaseController } from '../../common/base.controller';
import { AllowRoles } from '../../common/decorators/allow-roles.decorator';
import { ApiDocs } from '../../common/decorators/api.decorator';
import { UserLogged } from '../../common/decorators/user-logged.decorator';
import { GetChatRequest, GetChatResponse, GetChatsResponse } from './chat.dto';
import { Chat } from './chat.entity';
import { ChatsService } from './chats.service';

@ApiTags('chats')
@Controller('chats')
export class ChatsController extends BaseController {
    constructor(
        private readonly chatService: ChatsService,
    ) {
        super();
    }

    @Get()
    @AllowRoles(RolesList.Admin)
    @ApiDocs({
        summary: 'Get all conversations',
        operationId: 'getAllConversations',
        resStatus: HttpStatus.OK,
        resType: GetChatsResponse,
    })
    async getAll(@Body() request: GetChatRequest): Promise<GetChatsResponse> {
        const findOptions = BaseSearchRequest.getDefaultFindOptions<Chat>(request);
        if (request.search) {
            if (!findOptions.where) findOptions.where = [{}];
        }
        return await this.chatService.findAll(findOptions);
    }

    @Get(':id')
    @UserLogged()
    @ApiDocs({
        summary: 'Get conversation',
        operationId: 'getConversation',
        resStatus: HttpStatus.OK,
        resType: GetChatResponse,
    })
    async get(@Param('id') id: string): Promise<GetChatResponse> {
        return await this.chatService.findOne({ where: { id: id } });
    }
}