import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { User } from '../../models/user';
import { NgForOf, NgIf, SlicePipe } from '@angular/common';
import { MeetService } from '../../services/meet/meet.service';

@Component({
    selector: 'app-meet-participants',
    standalone: true,
    imports: [CardModule, AvatarGroupModule, AvatarModule, ButtonModule, SlicePipe, NgForOf, NgIf],
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

    payMeet() {
        if (!this.idMeet) {
            return;
        }
        this.meetService.payMeet(this.idMeet).subscribe();
    }
}