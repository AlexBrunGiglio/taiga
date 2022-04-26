import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(
        private socket: Socket,
    ) {

    }

    sendMessage(message: string) {
        this.socket.emit('chat', { content: 'test', message: message });
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