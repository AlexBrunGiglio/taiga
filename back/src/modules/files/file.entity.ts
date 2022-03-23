import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { User } from '../users/user.entity';
import { FileDto } from './file-dto';

@Entity({ name: 'file' })
export class File extends BaseEntity {
    @Column('varchar', { name: 'name', length: 30, unique: false })
    name: string;
    @Column('varchar', { name: 'type', length: 50, nullable: false })
    type: string;
    @Column({ name: 'lastModifiedDate', nullable: false, type: 'datetime' })
    lastModifiedDate: Date;
    @Column('varchar', { name: 'userId', nullable: true })
    userId: string;
    @ManyToOne(() => User, user => user.files, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user?: User;

    public toDto(): FileDto {
        return {
            id: this.id,
            creationDate: this.creationDate,
            modifDate: this.modifDate,
            archived: this.archived,
            name: this.name,
            type: this.type,
            lastModifiedDate: this.lastModifiedDate,
            userId: this.userId,
        }
    }

    public fromDto(dto: FileDto) {
        this.id = dto.id;
        this.name = dto.name;
        this.type = dto.type;
        this.lastModifiedDate = dto.lastModifiedDate;
        this.userId = dto.userId;

        if (!this.id)
            this.id = undefined;
    }
}
