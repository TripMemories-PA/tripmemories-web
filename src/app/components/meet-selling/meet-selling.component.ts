import { Component, Input } from '@angular/core';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { NgForOf, NgIf, SlicePipe } from '@angular/common';
import { User } from '../../models/user';

@Component({
    selector: 'app-meet-selling',
    standalone: true,
    imports: [AvatarGroupModule, AvatarModule, NgForOf, NgIf, SlicePipe],
    templateUrl: './meet-selling.component.html',
    styleUrl: './meet-selling.component.css',
})
export class MeetSellingComponent {
    @Input() users: User[] = [];
    @Input() nbrPaid: number = 0;
}
