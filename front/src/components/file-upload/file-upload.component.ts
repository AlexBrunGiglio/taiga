import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { TuiFileLike } from '@taiga-ui/kit';
import { firstValueFrom, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppValueDto, GenericResponse, GetFileResponse } from '../../providers/api-client.generated';
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
        private httpClient: HttpClient,
    ) {
    }

    removeFile() {
        this.file = {} as TuiFileLike;
    }

    async upload() {
        const formData = new FormData();
        formData.append('file', this.file as File, this.file.name)
        const response = await firstValueFrom(this.httpClient.post<Promise<GetFileResponse>>(environment.apiBaseUrl + '/api/files/upload', formData))

        if (!response.success) {
            this.dialogService.open('Une erreur est survenue. Merci de recommencer plus tard.');
        }
        console.log("🚀 ~ InputFileCustom ~ upload ~ response", response);
    }
}