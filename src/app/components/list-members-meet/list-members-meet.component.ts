import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { User } from '../../models/user';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { NgClass, NgForOf } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'app-list-members-meet',
    standalone: true,
    imports: [DialogModule, CardModule, NgForOf, AvatarModule, NgClass],
    templateUrl: './list-members-meet.component.html',
    styleUrl: './list-members-meet.component.css',
})
export class ListMembersMeetComponent implements OnChanges {
    @Input() members: User[] = [];

    @Input() displayDialog: boolean = false;

    @Output() closeDialog: EventEmitter<any> = new EventEmitter();

    total: number = 0;
    waitingTotal: number = 0;

    ngOnChanges(_: SimpleChanges): void {
        this.total = this.members.filter((member) => member.hasPaid).length;
        this.waitingTotal = this.members.filter((member) => !member.hasPaid).length;
    }
}
