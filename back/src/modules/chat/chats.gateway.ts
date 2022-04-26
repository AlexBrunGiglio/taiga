import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageDto } from './messages/message.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;
    usersConnected = 0;

    async handleConnection() {
        console.log("connexion");

        // increment user connected
        this.usersConnected++;

        // notify client
        this.server.emit('users', this.usersConnected);
    }

    async handleDisconnect() {
        console.log("deconnexion");

        // user disconnected
        this.usersConnected--;

        // notify client
        this.server.emit('users', this.usersConnected);
    }

    @SubscribeMessage('clickEvent')
    async onClickEvent(client) {
        client.broadcast.emit("clickEvent");
    }

    @SubscribeMessage('chat')
    async onChat(client, message: MessageDto) {
        console.log("🚀 ~ ChatGateway ~ onChat ~ obj", message);
        console.log('new message');

        client.broadcast.emit("chat", message);
    }
}