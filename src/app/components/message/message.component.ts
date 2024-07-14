import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-message',
    standalone: true,
    imports: [NgClass, NgIf],
    templateUrl: './message.component.html',
    styleUrl: './message.component.css',
})
export class MessageComponent {
    @Input() message: string = '';
    @Input() name?: string = '';
    @Input() myMessage: boolean = false;
    @Input() time: string = '';
    @Input() avatar?: string = '';
}
