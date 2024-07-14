import { Component, OnInit } from '@angular/core';
import { MeetService } from '../../services/meet/meet.service';
import { AuthService } from '../../services/auth/auth.service';
import { MeetModel } from '../../models/meet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyTicketPoiCardComponent } from '../../components/buy-ticket-poi-card/buy-ticket-poi-card.component';
import { User } from '../../models/user';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { MeetParticipantsComponent } from '../../components/meet-participants/meet-participants.component';
import { MeetSellingComponent } from '../../components/meet-selling/meet-selling.component';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { PaymentCardComponent } from '../../components/payment-card/payment-card.component';
import { ListMembersMeetComponent } from '../../components/list-members-meet/list-members-meet.component';
import { ButtonModule } from 'primeng/button';
import { TicketModel } from '../../models/ticket.model';
import { PoisService } from '../../services/pois/pois.service';
import { MonumentCardFeedComponent } from '../../components/monument-card-feed/monument-card-feed.component';
import { ChatCardMeetComponent } from '../../components/chat-card-meet/chat-card-meet.component';

@Component({
    selector: 'app-meet-page',
    standalone: true,
    imports: [
        BuyTicketPoiCardComponent,
        NgOptimizedImage,
        MeetParticipantsComponent,
        MeetSellingComponent,
        PaymentCardComponent,
        ListMembersMeetComponent,
        ButtonModule,
        NgIf,
        NgForOf,
        MonumentCardFeedComponent,
        ChatCardMeetComponent,
    ],
    templateUrl: './meet-page.component.html',
    styleUrl: './meet-page.component.css',
})
export class MeetPageComponent implements OnInit {
    meet?: MeetModel;
    users: User[] = [];
    idMeet: string = '';
    isLocked: boolean = false;
    canJoin: boolean = false;
    usersCount: number = 0;
    date: string = '';
    nbrPaid: number = 0;
    hasJoined: boolean = false;
    hasPaid: boolean = false;
    ticket?: TicketModel;
    amount: string | number = 0;
    totalMessage: number = 0;

    tickets: TicketModel[] = [];

    displayDialog: boolean = false;

    constructor(
        private _activatedRoutes: ActivatedRoute,
        private router: Router,
        private meetService: MeetService,
        private authService: AuthService,
        private poiServices: PoisService,
    ) {}

    ngOnInit() {
        this._activatedRoutes.paramMap.subscribe((params) => {
            if (params.has('id')) {
                const meetId = params.get('id') as string;
                this.idMeet = meetId;
                this.getMeet(meetId);
                this.getMessageMeet(meetId);
            } else {
                this.router.navigate(['/']);
            }
        });
    }

    get isOwner(): boolean {
        return this.meet?.createdById === (this.authService.user?.id as unknown as number);
    }

    get userId(): string {
        return this.authService.user?.id as unknown as string;
    }

    private getUsers(meetId: string, page: string | number = 1, perPage: number | string = 10) {
        this.meetService.getUsersMeet(meetId, page, perPage).subscribe({
            next: (users) => {
                this.users = users.data;
                this.nbrPaid = users.data.filter((user) => user.hasPaid).length;
                this.hasJoined = users.data.some((user) => user.id === this.authService.user?.id);
                this.hasPaid = users.data.some(
                    (user) => user.id === this.authService.user?.id && user.hasPaid,
                );
            },
            error: (error) => {
                console.error(error);
            },
        });
    }

    private getPoiTickets(poiId: string) {
        this.poiServices.getPoisTickets(poiId).subscribe({
            next: (tickets) => {
                this.tickets = tickets;
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
                this.canJoin = meet.canJoin as boolean;
                this.isLocked = meet.isLocked;
                if (meet.ticket !== null) {
                    this.ticket = meet.ticket;
                    this.amount = meet.ticket.price;
                } else {
                    this.getPoiTickets(meet.poiId.toString());
                }
                this.getUsers(meetId, 1, meet.size);
            },
            error: (error) => {
                console.error(error);
            },
        });
    }

    private getMessageMeet(meetId: string) {
        this.meetService.getMessages(meetId, '1', '0').subscribe({
            next: (messages) => {
                this.totalMessage = messages.meta.total;
            },
            error: (error) => {
                console.error(error);
            },
        });
    }

    reload() {
        this.getMeet(this.idMeet);
    }

    onClosedDialog() {
        this.displayDialog = false;
    }
}
