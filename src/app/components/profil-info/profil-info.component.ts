import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChangeProfilPicComponent } from '../change-profil-pic/change-profil-pic.component';
import { User } from '../../models/user';
import { MyInformationsComponent } from '../my-informations/my-informations.component';

@Component({
    selector: 'app-profil-info',
    standalone: true,
    imports: [CardModule, ChangeProfilPicComponent, MyInformationsComponent],
    templateUrl: './profil-info.component.html',
    styleUrl: './profil-info.component.css',
})
export class ProfilInfoComponent {
    @Input() profilPic: string | undefined = undefined;
    @Input() nbrFriends: number = 0;
    @Input() nbrMonuments?: number = 0;
    @Input() nbrPoints?: number = 0;
    @Input() user: User = JSON.parse(
        (localStorage.getItem('user') as string) ?? (sessionStorage.getItem('user') as string),
    );
}
