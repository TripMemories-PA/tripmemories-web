import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { User } from '../../models/user';
import { NgForOf, NgIf, SlicePipe } from '@angular/common';
import { MeetService } from '../../services/meet/meet.service';
import { PaymentCardComponent } from '../payment-card/payment-card.component';

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

    paymentIntent = '';
    showPaymentDialog = false;

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
        this.meetService.joinMeet(this.idMeet).subscribe({
            next: (_) => {
                this.hasJoined = true;
            },
            error: (err) => {
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
                this.hasJoined = false;
            },
            error: (err) => {
                console.error(err);
            },
        });
    }

    closePaymentDialog() {
        this.showPaymentDialog = false;
    }
}
