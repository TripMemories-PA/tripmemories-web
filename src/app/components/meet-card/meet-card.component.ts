import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';
import { DialogModule } from 'primeng/dialog';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { SharedModule } from 'primeng/api';
import { MeetModel } from '../../meet.model';
import { MeetService } from '../../services/meet/meet.service';
import { Router } from '@angular/router';
import { MeetRequest } from '../../models/request/meet.request';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-meet-card',
    standalone: true,
    imports: [
        ButtonModule,
        CardModule,
        CreateTicketComponent,
        DialogModule,
        NgIf,
        NgOptimizedImage,
        ProgressBarModule,
        SharedModule,
        FormsModule,
        InputTextModule,
    ],
    templateUrl: './meet-card.component.html',
    styleUrl: './meet-card.component.css',
})
export class MeetCardComponent {
    @Input() meet?: MeetModel;
    @Input() isOwner: boolean = false;
    @Output() event: EventEmitter<any> = new EventEmitter();

    constructor(
        private meetService: MeetService,
        private router: Router,
    ) {}

    meetRequest: MeetRequest = {
        title: '',
    };

    visible: boolean = false;
    visibleDelete: boolean = false;
    loading: boolean = false;

    deleteMeet() {
        if (!this.meet?.id) {
            return;
        }
        this.meetService.deleteMeet(this.meet?.id.toString()).subscribe({
            next: () => {
                this.visibleDelete = false;
                setTimeout(() => {
                    this.event.emit();
                }, 5000);
            },
        });
    }

    updateMeet() {
        this.loading = true;
        if (!this.meet?.id) {
            return;
        }
        this.meetService.updateMeet(this.meet?.id.toString(), this.meetRequest).subscribe({
            next: () => {
                this.visible = false;
                setTimeout(() => {
                    this.event.emit();
                }, 5000);
            },
        });
    }

    goToMeet() {
        if (!this.meet?.id) {
            console.log('No meet id');
            return;
        }
        this.router.navigate(['/meets', this.meet.id]);
    }
}
