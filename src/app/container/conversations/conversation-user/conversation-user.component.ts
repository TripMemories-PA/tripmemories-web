import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModel } from '../../../message.model';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageComponent } from '../../../components/message/message.component';
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { format, isSameDay } from 'date-fns';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user';
import { IMessageRequest } from '../../../models/interface/IMessageRequest';
import { FormsModule } from '@angular/forms';
import Pusher, { Channel } from 'pusher-js';
import { fr } from 'date-fns/locale';

@Component({
    selector: 'app-conversation-user',
    standalone: true,
    imports: [
        ButtonModule,
        InputTextModule,
        MessageComponent,
        NgForOf,
        NgClass,
        NgOptimizedImage,
        FormsModule,
        NgIf,
    ],
    templateUrl: './conversation-user.component.html',
    styleUrl: './conversation-user.component.css',
})
export class ConversationUserComponent implements OnInit {
    constructor(
        private userService: UsersService,
        private _activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private router: Router,
    ) {}

    pusher: Pusher = new Pusher(import.meta.env.NG_APP_PUSHER_APP_KEY, {
        cluster: import.meta.env.NG_APP_PUSHER_APP_CLUSTER,
    });

    channel?: Channel;

    messages: (MessageModel | { date: string })[] = [];
    user: User = new User();

    message: IMessageRequest = {
        content: '',
    };

    ngOnInit() {
        this._activatedRoute.paramMap.subscribe((params) => {
            if (params.has('id')) {
                this.userService.getUser(params.get('id') as string, this.isConnect).subscribe({
                    next: (response) => {
                        this.user = response;
                        if (this.user.channel) {
                            this.channel = this.pusher.subscribe(this.user.channel);
                            this.channel.bind('message', (data: MessageModel) => {
                                this.addMessage(data);
                            });
                        }
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
                this.userService.getMessages(params.get('id') as string).subscribe({
                    next: (response) => {
                        this.messages = this.processMessages(response.data);
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
            }
        });
    }

    get isConnect(): boolean {
        return this.authService.user?.access_token !== undefined;
    }

    submitMessage() {
        if (!this.message.content) {
            return;
        }
        this.userService.storeMessage(this.user.id as string, this.message).subscribe({
            next: (_) => {
                this.message.content = '';
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

    goToProfile() {
        this.router.navigate(['/user', this.user.id]);
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
