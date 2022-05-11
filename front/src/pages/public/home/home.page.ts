import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChatDto, UserDto } from '../../../providers/api-client.generated';
import { ChatService } from '../../../utils/services/chat.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomePage implements OnInit {
    usersConnected = 0;
    message: string = '';
    messages: string[] = [];
    buttonClicked = false;
    conversation!: ChatDto;

    constructor(private chatService: ChatService) {

    }

    ngOnInit() {
        this.chatService.receiveMessage().subscribe((message: any) => {
            this.messages.push(message);
        });
        this.chatService.getUserConnected().subscribe((users: any) => {
            this.usersConnected = users;
        });
        this.chatService.reveiceClickEvent().subscribe((event: any) => {
            this.buttonClicked = true;
        });
    }

    addChat() {
        this.messages.push(this.message);
        // this.chatService.sendMessage({messages: []});
        this.message = '';
    }

    sendEvent() {
        this.buttonClicked = true;
        this.chatService.clickEvent();
    }


}