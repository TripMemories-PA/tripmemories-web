import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-chat-card-meet',
    standalone: true,
    imports: [ButtonModule, NgOptimizedImage, NgIf],
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
    @Input() hasJoined: boolean = false;

    goToChat() {
        this.router.navigate([`/meets/conversations`, this.meetId]);
    }
}
