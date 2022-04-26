import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { User } from '../users/user.entity';
import { ChatDto } from './chat.dto';
import { Message } from './messages/message.entity';

@Entity({ name: 'chats' })
export class Chat extends BaseEntity {
    @OneToMany(() => Message, message => message.chat, { cascade: true })
    messages?: Message[];
    @ManyToMany(() => User, user => user.roles)
    @JoinTable({ name: 'user_chat' })
    users?: User[];

    public toDto(): ChatDto {
        return {
            id: this.id,
            archived: this.archived,
            creationDate: this.creationDate,
            modifDate: this.modifDate,
            messages: this.messages ? this.messages.map(x => x.toDto()) : [],
            users: this.users ? this.users.map(x => x.toDto()) : [],
        };
    }

    public fromDto(dto: ChatDto) {
        this.id = dto.id;
        this.archived = dto.archived;

        if (dto.users) {
            this.users = dto.users.map<User>(xDto => {
                const user = new User();
                user.fromDto(xDto);
                return user;
            });
        }

        if (dto.messages?.length) {
            this.messages = [];
            for (const message of dto.messages) {
                const messageCtx = new Message();
                messageCtx.fromDto(message);
                this.messages.push(messageCtx);
            }
        }

        if (!this.id)
            this.id = undefined;
    }
}