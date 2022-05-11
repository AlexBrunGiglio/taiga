import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ChatDto } from '../../providers/api-client.generated';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(
        private socket: Socket,
    ) {

    }

    sendMessage(chat: ChatDto) {
        this.socket.emit('chat', chat);
    }

    receiveMessage() {
        return this.socket.fromEvent('chat');
    }

    getUserConnected() {
        return this.socket.fromEvent('users');
    }

    clickEvent() {
        this.socket.emit('clickEvent');
    }

    reveiceClickEvent() {
        return this.socket.fromEvent('clickEvent');
    }
}