import { Component, OnInit } from '@angular/core';
import { MeetService } from '../../services/meet/meet.service';
import { AuthService } from '../../services/auth/auth.service';
import { UsersService } from '../../services/users/users.service';
import { MeetModel } from '../../meet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyTicketPoiCardComponent } from '../../components/buy-ticket-poi-card/buy-ticket-poi-card.component';
import { User } from '../../models/user';
import { NgOptimizedImage } from '@angular/common';
import { MeetParticipantsComponent } from '../../components/meet-participants/meet-participants.component';
import { MeetSellingComponent } from '../../components/meet-selling/meet-selling.component';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { PaymentCardComponent } from '../../components/payment-card/payment-card.component';

@Component({
    selector: 'app-meet-page',
    standalone: true,
    imports: [
        BuyTicketPoiCardComponent,
        NgOptimizedImage,
        MeetParticipantsComponent,
        MeetSellingComponent,
        PaymentCardComponent,
    ],
    templateUrl: './meet-page.component.html',
    styleUrl: './meet-page.component.css',
})
export class MeetPageComponent implements OnInit {
    meet?: MeetModel;
    users: User[] = [];
    idMeet: string = '';
    isLocked: boolean = false;
    usersCount: number = 0;
    date: string = '';
    nbrPaid: number = 0;

    constructor(
        private _activatedRoutes: ActivatedRoute,
        private router: Router,
        private meetService: MeetService,
        private authService: AuthService,
        private userServices: UsersService,
    ) {}

    ngOnInit() {
        this._activatedRoutes.paramMap.subscribe((params) => {
            if (params.has('id')) {
                const meetId = params.get('id') as string;
                this.idMeet = meetId;
                this.getMeet(meetId);
            } else {
                this.router.navigate(['/']);
            }
        });
    }

    get isOwner(): boolean {
        return this.meet?.createdById === (this.authService.user?.id as unknown as number);
    }

    private getUsers(meetId: string, page: string | number = 1, perPage: number | string = 10) {
        this.meetService.getUsersMeet(meetId, page, perPage).subscribe({
            next: (users) => {
                this.users = users.data;
                this.nbrPaid = users.data.filter((user) => user.hasPaid).length;
            },
            error: (error) => {
                console.error(error);
            },
        });
    }

    private getMeet(meetId: string) {
        this.meetService.getMeet(meetId).subscribe({
            next: (meet) => {
                this.meet = meet;
                this.isLocked = meet.isLocked;
                this.date = format(meet.date, 'dd MMMM yyyy', { locale: fr });
                this.usersCount = meet.usersCount;
                this.getUsers(meetId, 1, meet.size);
            },
            error: (error) => {
                console.error(error);
            },
        });
    }
}
