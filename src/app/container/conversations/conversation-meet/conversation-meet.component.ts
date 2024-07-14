import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import Pusher, { Channel } from 'pusher-js';
import { MessageModel } from '../../../message.model';
import { User } from '../../../models/user';
import { IMessageRequest } from '../../../models/interface/IMessageRequest';
import { format, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MeetService } from '../../../services/meet/meet.service';
import { MeetModel } from '../../../models/meet.model';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageComponent } from '../../../components/message/message.component';
import { NgClass, NgForOf, NgIf, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'app-conversation-meet',
    standalone: true,
    imports: [
        ButtonModule,
        InputTextModule,
        MessageComponent,
        NgForOf,
        NgClass,
        FormsModule,
        AvatarGroupModule,
        AvatarModule,
        SlicePipe,
        NgIf,
    ],
    templateUrl: './conversation-meet.component.html',
    styleUrl: './conversation-meet.component.css',
})
export class ConversationMeetComponent implements OnInit, AfterViewChecked {
    constructor(
        private meetService: MeetService,
        private _activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private router: Router,
    ) {}

    @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

    pusher: Pusher = new Pusher(import.meta.env.NG_APP_PUSHER_APP_KEY, {
        cluster: import.meta.env.NG_APP_PUSHER_APP_CLUSTER,
    });

    channel?: Channel;

    messages: (MessageModel | { date: string })[] = [];
    meet?: MeetModel;
    users: User[] = [];

    totalMembers: number = 0;
    nbrPage: number = 2;
    shouldScroll = true;

    message: IMessageRequest = {
        content: '',
    };

    ngOnInit() {
        this._activatedRoute.paramMap.subscribe((params) => {
            if (params.has('id')) {
                this.meetService.getMeet(params.get('id') as string).subscribe({
                    next: (response) => {
                        this.meet = response;
                        if (this.meet.channel) {
                            this.channel = this.pusher.subscribe(this.meet.channel);
                            this.channel.bind('message', (data: MessageModel) => {
                                this.addMessage(data);
                            });
                        }
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
                this.meetService.getMessages(params.get('id') as string).subscribe({
                    next: (response) => {
                        this.messages = this.processMessages(response.data);
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
                this.meetService.getUsersMeet(params.get('id') as string).subscribe({
                    next: (response) => {
                        this.users = response.data;
                        this.totalMembers = response.meta.total;
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
            }
        });
    }

    ngAfterViewChecked(): void {
        if (this.shouldScroll) {
            this.scrollToBottom();
            this.shouldScroll = false;
        }
    }

    scrollToBottom(): void {
        try {
            this.scrollContainer.nativeElement.scrollTop =
                this.scrollContainer.nativeElement.scrollHeight;
        } catch (err) {
            console.error('Failed to scroll to bottom:', err);
        }
    }

    getNextMessages() {
        this.meetService.getMessages(this.meet?.id.toString() as string, this.nbrPage).subscribe({
            next: (response) => {
                this.messages = this.processMessages([
                    ...(this.messages as MessageModel[]),
                    ...response.data,
                ]);
                this.nbrPage++;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    scrollTop(event: Event) {
        const element = event.target as HTMLElement;
        const isScrolledToTop = element.scrollTop === 0;

        if (isScrolledToTop) {
            this.getNextMessages();
        }
    }

    get isConnect(): boolean {
        return this.authService.user?.access_token !== undefined;
    }

    submitMessage() {
        if (!this.message.content) {
            return;
        }
        this.meetService.storeMessage(this.meet?.id.toString() as string, this.message).subscribe({
            next: (_) => {
                this.message.content = '';
                setTimeout(() => (this.shouldScroll = true), 100);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    get myId(): number {
        return this.authService.user?.id as unknown as number;
    }

    formatTime(time: Date) {
        return format(time, 'HH:mm');
    }

    goToProfile(userId: string) {
        this.router.navigate(['/user', userId]);
    }

    processMessages(messages: MessageModel[]): (MessageModel | { date: string })[] {
        const result: (MessageModel | { date: string })[] = [];
        let lastDate: Date | null = null;

        for (const message of messages) {
            const messageDate = new Date(message.createdAt);
            if (!lastDate || !isSameDay(lastDate, messageDate)) {
                result.push({ date: format(messageDate, 'PP', { locale: fr }) });
                lastDate = messageDate;
            }
            result.push(message);
        }
        return result.sort((a, b) => {
            if (this.isDateMarker(a) && this.isDateMarker(b)) {
                return 0;
            }
            if (this.isDateMarker(a)) {
                return -1;
            }
            if (this.isDateMarker(b)) {
                return 1;
            }
            return a.createdAt < b.createdAt ? -1 : 1;
        });
    }

    addMessage(message: MessageModel) {
        this.messages.push(message);
        this.messages = this.processMessages(this.messages as MessageModel[]);
    }

    isDateMarker(item: any): item is { date: string } {
        return 'date' in item;
    }
}
