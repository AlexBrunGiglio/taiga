

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { Chat } from '../chat.entity';
import { MessageDto } from './message.dto';

@Entity({ name: 'messages' })
export class Message extends BaseEntity {
    @Column('text', { name: 'content', nullable: false })
    content: string;
    @Column('varchar', { name: 'userId', length: 36, nullable: false })
    public userId: string;
    @ManyToOne(() => Chat, chat => chat.messages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'chatId' })
    public chat?: Chat;
    @Column('varchar', { name: 'chatId', length: 36, nullable: false })
    public chatId: string;

    public toDto(): MessageDto {
        return {
            id: this.id,
            archived: this.archived,
            content: this.content,
            creationDate: this.creationDate,
            modifDate: this.modifDate,
            userId: this.userId,
            chatId: this.chatId,
        };
    }

    public fromDto(dto: MessageDto) {
        this.id = dto.id;
        this.archived = dto.archived;
        this.userId = dto.userId;
        this.content = dto.content;

        if (!this.id)
            this.id = undefined;
    }
}