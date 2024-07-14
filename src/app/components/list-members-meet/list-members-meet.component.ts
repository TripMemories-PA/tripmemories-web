import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { User } from '../../models/user';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { MeetService } from '../../services/meet/meet.service';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-list-members-meet',
    standalone: true,
    imports: [
        DialogModule,
        CardModule,
        NgForOf,
        AvatarModule,
        NgClass,
        ButtonModule,
        NgIf,
        ProgressBarModule,
        ToastModule,
    ],
    providers: [MessageService],
    templateUrl: './list-members-meet.component.html',
    styleUrl: './list-members-meet.component.css',
})
export class ListMembersMeetComponent implements OnChanges {
    @Input() members: User[] = [];
    @Input() meetId?: string | number = '';
    @Input() owner: boolean = false;
    @Input() userId: string = '';
    @Output() reloadMeet: EventEmitter<any> = new EventEmitter();

    @Input() displayDialog: boolean = false;

    @Output() closeDialog: EventEmitter<any> = new EventEmitter();

    constructor(
        private meetService: MeetService,
        private messageService: MessageService,
    ) {}

    total: number = 0;
    waitingTotal: number = 0;
    visibleBan: boolean = false;
    loading: boolean = false;

    ngOnChanges(_: SimpleChanges): void {
        this.total = this.members.filter((member) => member.hasPaid).length;
        this.waitingTotal = this.members.filter((member) => !member.hasPaid).length;
    }

    banUser(user: User): void {
        if (!user.id || !this.meetId) return;
        this.meetService.deleteUserMeet(this.meetId.toString(), user.id.toString()).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Utilisateur banni',
                    detail: "L'utilisateur a bien été banni de l'événement",
                });
                this.visibleBan = false;
                this.loading = false;
                this.members = this.members.filter((member) => member.id !== user.id);
                this.total = this.members.filter((member) => member.hasPaid).length;
                this.waitingTotal = this.members.filter((member) => !member.hasPaid).length;
                setTimeout(() => {
                    this.closeDialog.emit();
                    this.reloadMeet.emit();
                }, 1000);
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: "Une erreur s'est produite lors du bannissement de l'utilisateur",
                });
                this.visibleBan = false;
                this.loading = false;
            },
        });
    }
}
