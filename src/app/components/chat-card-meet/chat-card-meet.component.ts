import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-chat-card-meet',
    standalone: true,
    imports: [ButtonModule, NgOptimizedImage],
    templateUrl: './chat-card-meet.component.html',
    styleUrl: './chat-card-meet.component.css',
})
export class ChatCardMeetComponent {
    constructor(private router: Router) {}

    @Input() title?: string = '';
    @Input() image?: string = '';
    @Input() nbrMessages: number = 0;
    @Input() nbrMembres: number = 0;
    @Input() meetId: string = '';

    goToChat() {
        this.router.navigate([`/meets/conversations`, this.meetId]);
    }
}
