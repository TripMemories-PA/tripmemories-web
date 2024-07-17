import {
    AfterViewChecked,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
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
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { ConfigService } from '../../../services/config/config.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Location } from '@angular/common';

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
        PickerComponent,
        InputTextareaModule,
    ],
    templateUrl: './conversation-user.component.html',
    styleUrl: './conversation-user.component.css',
})
export class ConversationUserComponent implements OnInit, AfterViewChecked, OnDestroy {
    constructor(
        private userService: UsersService,
        private _activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private router: Router,
        private configService: ConfigService,
        private location: Location,
    ) {}
    @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

    pusher: Pusher = new Pusher(this.configService.pusherAppKey, {
        cluster: this.configService.pusherAppCluster,
    });

    nbrPage: number = 2;
    channel?: Channel;

    shouldScroll = true;
    showEmojiPicker = false;

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
                                setTimeout(() => this.scrollToBottom(), 100);
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
                        setTimeout(() => this.scrollToBottom(), 100);
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

    get isConnect(): boolean {
        return this.authService.user?.access_token !== undefined;
    }

    submitMessage() {
        if (!this.message.content || this.message.content.trim() === '') {
            return;
        }
        this.message.content = this.message.content.trim();
        console.log(this.message.content);
        this.userService.storeMessage(this.user.id as string, this.message).subscribe({
            next: (_) => {
                this.message.content = '';
                setTimeout(() => {
                    this.shouldScroll = true;
                }, 100);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    getNextMessages() {
        this.userService.getMessages(this.user.id as string, this.nbrPage).subscribe({
            next: (response) => {
                this.messages = this.processMessages(
                    response.data.concat(this.messages as MessageModel[]),
                );
                this.nbrPage += 1;
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
            if (isNaN(messageDate.valueOf())) {
                continue;
            }
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
                return (
                    new Date((b as MessageModel).createdAt).getTime() -
                    new Date((a as { date: string }).date).getTime()
                );
            }
            if (this.isDateMarker(b)) {
                return (
                    new Date((a as MessageModel).createdAt).getTime() -
                    new Date((b as { date: string }).date).getTime()
                );
            }
            return (
                new Date((a as MessageModel).createdAt).getTime() -
                new Date((b as MessageModel).createdAt).getTime()
            );
        });
    }

    addMessage(message: MessageModel) {
        this.messages.push(message);
        this.messages = this.processMessages(this.messages as MessageModel[]);
    }

    addEmoji(event: EmojiEvent) {
        const emoji = event.emoji;
        this.message.content += emoji.native;
        this.showEmojiPicker = false;
    }

    toggleEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
    }

    isDateMarker(item: any): item is { date: string } {
        return 'date' in item;
    }

    ngOnDestroy(): void {
        this.channel?.unsubscribe();
        this.pusher.unsubscribe(this.user.channel as string);
    }

    goBack() {
        this.location.back();
    }
}
