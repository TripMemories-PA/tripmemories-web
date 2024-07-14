import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-message',
    standalone: true,
    imports: [NgClass],
    templateUrl: './message.component.html',
    styleUrl: './message.component.css',
})
export class MessageComponent {
    @Input() message: string = '';
    @Input() myMessage: boolean = false;
    @Input() time: string = '';
}
