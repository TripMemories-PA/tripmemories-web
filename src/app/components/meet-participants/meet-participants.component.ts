import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { User } from '../../models/user';
import { NgForOf, NgIf, SlicePipe } from '@angular/common';
import { MeetService } from '../../services/meet/meet.service';
import { PaymentCardComponent } from '../payment-card/payment-card.component';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
    selector: 'app-meet-participants',
    standalone: true,
    imports: [
        CardModule,
        AvatarGroupModule,
        AvatarModule,
        ButtonModule,
        SlicePipe,
        NgForOf,
        NgIf,
        PaymentCardComponent,
        DialogModule,
        ProgressBarModule,
    ],
    templateUrl: './meet-participants.component.html',
    styleUrl: './meet-participants.component.css',
})
export class MeetParticipantsComponent {
    constructor(private meetService: MeetService) {}

    @Input() users: User[] = [];
    @Input() isOwner: boolean = false;
    @Input() hasJoined: boolean = false;
    @Input() hasPaid: boolean = false;
    @Input() isLocked: boolean = false;
    @Input() nbrParticipants?: number = 0;
    @Input() userCount: number = 0;
    @Input() idMeet?: string;
    @Input() isLockedMeet: boolean = false;
    @Input() canJoin: boolean = false;
    @Input() hasTicketMeet: boolean = true;

    @Output() reloadMeet: EventEmitter<any> = new EventEmitter();

    loading = false;

    paymentIntent = '';
    showPaymentDialog = false;

    visibleJoinMeet = false;
    visibleLeaveMeet = false;

    payMeet() {
        if (!this.idMeet) {
            return;
        }
        this.meetService.payMeet(this.idMeet).subscribe({
            next: (res) => {
                this.paymentIntent = res.paymentIntent;
                this.showPaymentDialog = true;
            },
            error: (err) => {
                console.error(err);
            },
        });
    }

    joinMeet() {
        if (!this.idMeet) {
            return;
        }
        this.loading = true;
        this.meetService.joinMeet(this.idMeet).subscribe({
            next: (_) => {
                this.loading = false;
                this.hasJoined = true;
                this.reloadMeet.emit();
            },
            error: (err) => {
                this.loading = false;
                console.error(err);
            },
        });
    }

    leaveMeet() {
        if (!this.idMeet) {
            return;
        }
        this.meetService.leaveMeet(this.idMeet).subscribe({
            next: (_) => {
                this.loading = false;
                this.hasJoined = false;
                this.reloadMeet.emit();
            },
            error: (err) => {
                this.loading = false;
                console.error(err);
            },
        });
    }

    closePaymentDialog() {
        this.showPaymentDialog = false;
        this.reloadMeet.emit();
    }
}
