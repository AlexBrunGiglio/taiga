import { NgModule } from '@angular/core';
import { TuiTextfieldSizeDirective, TUI_TEXTFIELD_SIZE } from '@taiga-ui/core';
import { TuiAvatarModule, TuiInputModule, TuiTextAreaModule } from '@taiga-ui/kit';
import { BasePageModulesList } from '../../app/app.module';
import { ChatComponent } from './chat.component';

@NgModule({
    imports: [...BasePageModulesList, TuiAvatarModule, TuiTextAreaModule],
    declarations: [ChatComponent],
    exports: [ChatComponent],
    providers: [
        {
            provide: TUI_TEXTFIELD_SIZE,
            useValue: { size: 's' }
        }
    ]
})
export class ChatModule { }