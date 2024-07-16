import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { QuestService } from '../../services/quest/quest.service';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { QuestRequest } from '../../models/request/quest.request';
import { NgIf } from '@angular/common';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'app-create-quest',
    standalone: true,
    imports: [FileUploadModule, FormsModule, InputTextModule, DropdownModule, NgIf, MessageModule],
    templateUrl: './create-quest.component.html',
    styleUrl: './create-quest.component.css',
})
export class CreateQuestComponent implements OnInit {
    @Input() poiId?: number;
    @Output() reloadQuest: EventEmitter<any> = new EventEmitter();
    @ViewChild('fileUp') fileUp: any;

    constructor(private questService: QuestService) {}
    file: File | null = null;
    questRequest: QuestRequest = {
        title: '',
        imageId: -1,
        poiId: -1,
        label: '',
    };

    success: string | null = null;
    error: string | null = null;

    labels: string[] = [];
    loading: boolean = false;

    get valid(): boolean {
        return (
            !!this.questRequest.title &&
            !!this.questRequest.label &&
            this.questRequest.imageId !== -1 &&
            this.questRequest.poiId !== -1
        );
    }

    storeImage(event: FileSelectEvent) {
        this.loading = true;
        this.file = event.currentFiles[0];
        this.questService.storePicture(this.file).subscribe({
            next: (res) => {
                this.loading = false;
                this.labels = res.labels;
                this.questRequest.imageId = res.file?.id ?? -1;
            },
            error: (err) => {
                this.loading = false;
                this.error = "Erreur lors de l'envoi de l'image";
                console.error(err);
            },
        });
    }

    submitQuest() {
        this.loading = true;
        if (!this.valid) {
            this.loading = false;
            return;
        }
        this.questService.createQuest(this.questRequest).subscribe({
            next: (res) => {
                this.loading = false;
                this.success = 'Mission créée avec succès';
                setTimeout(() => {
                    this.reloadQuest.emit();
                }, 3000);
            },
            error: (err) => {
                this.loading = false;
                this.error = 'Erreur lors de la création de la mission';
                console.error(err);
            },
        });
    }

    removeImage() {
        this.file = null;
        this.fileUp.clear();
        this.labels = [];
        this.questRequest.imageId = -1;
    }

    ngOnInit() {
        if (this.poiId) {
            this.questRequest.poiId = this.poiId;
        }
    }
}
