import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { TuiFileLike } from '@taiga-ui/kit';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppValueDto } from '../../providers/api-client.generated';
import { accessToken } from '../../utils/constant';

@Component({
    selector: 'app-input-file',
    encapsulation: ViewEncapsulation.None,
    template: `
    <tui-input-files *ngIf="!file?.name" link="Choisissez un fichier"
    label="ou faites le glisser dans la zone" accept="image/*,application/pdf" [(ngModel)]="file" name="fileupload"
    (ngModelChange)="upload()">
    </tui-input-files>
    <tui-files>
        <tui-file *ngIf="file.name" [file]="file" (removed)="removeFile()"></tui-file>
    </tui-files>
    `,
})
export class InputFileCustom {
    @Input()
    fileCategory!: AppValueDto;
    readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
    file = {} as TuiFileLike;

    constructor(
        private dialogService: TuiDialogService,
    ) {
    }

    removeFile() {
        this.file = {} as TuiFileLike;
    }

    async upload() {
        let formData = new FormData();
        const body = {
            formData: formData,
            fileCategory: this.fileCategory,
        }
        formData.append('file', this.file as File, this.file.name)

        const jwtToken = localStorage.getItem(accessToken);
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${jwtToken}`);

        const response = await fetch(environment.apiBaseUrl + '/api/files/upload', {
            method: 'POST',
            body: formData,
            headers: headers,
        })

        if (!response.ok) {
            this.dialogService.open('Une erreur est survenue. Merci de recommencer plus tard.');
        }
    }
}