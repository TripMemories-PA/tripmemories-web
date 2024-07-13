import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestModel } from '../../models/quest.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { QuestService } from '../../services/quest/quest.service';
import { QuestRequest } from '../../models/request/quest.request';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'app-my-mission-card',
    standalone: true,
    imports: [
        ButtonModule,
        CardModule,
        DialogModule,
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        NgIf,
        NgOptimizedImage,
        ProgressBarModule,
        MessageModule,
        NgClass,
    ],
    templateUrl: './my-mission-card.component.html',
    styleUrl: './my-mission-card.component.css',
})
export class MyMissionCardComponent implements OnInit {
    @Input() quest?: QuestModel;
    @Input() isPoi: boolean = false;
    @Input() done: boolean = false;
    @Output() reloadQuest: EventEmitter<any> = new EventEmitter();

    visible: boolean = false;
    visibleDelete: boolean = false;

    loading: boolean = false;
    success: string | null = null;
    error: string | null = null;

    questRequest: QuestRequest = {
        title: '',
    };

    constructor(private questService: QuestService) {}

    get validQuest(): boolean {
        return !!this.questRequest.title;
    }

    deleteQuest(): void {
        if (!this.quest?.id) {
            return;
        }
        this.loading = true;
        this.questService.deleteQuest(this.quest?.id.toString()).subscribe({
            next: () => {
                this.loading = false;
                this.success = 'Mission supprimée';
                setTimeout(() => {
                    this.visibleDelete = false;
                    this.reloadQuest.emit();
                }, 3000);
            },
            error: () => {
                this.error = 'Erreur lors de la suppression de la mission';
                this.loading = false;
            },
        });
    }

    updateQuest(): void {
        if (!this.quest?.id || !this.validQuest) {
            return;
        }
        this.loading = true;
        this.questService.updateQuest(this.quest?.id.toString(), this.questRequest).subscribe({
            next: () => {
                this.loading = false;
                setTimeout(() => {
                    this.visible = false;
                    this.success = 'Mission modifiée';
                    this.reloadQuest.emit();
                }, 3000);
            },
            error: () => {
                this.error = 'Erreur lors de la modification de la mission';
                this.loading = false;
            },
        });
    }

    ngOnInit(): void {
        if (this.quest) {
            this.questRequest.title = this.quest.title;
        }
    }
}
