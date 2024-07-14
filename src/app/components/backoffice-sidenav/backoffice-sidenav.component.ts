import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-backoffice-sidenav',
    standalone: true,
    imports: [SidebarModule, ButtonModule, ListboxModule, FormsModule],
    templateUrl: './backoffice-sidenav.component.html',
    styleUrl: './backoffice-sidenav.component.css',
})
export class BackofficeSidenavComponent {
    constructor(private authService: AuthService) {}

    sidebarVisible = false;
    selectedItem: any;

    items = [
        {
            label: 'Comptes utilisateurs',
            command: () => {
                console.log('new');
            },
        },
        {
            label: "Points d'intérêts",
            command: () => {
                console.log('search');
            },
        },
        {
            label: 'Posts',
            command: () => {
                console.log('search');
            },
        },
        {
            label: 'Commentaires',
            command: () => {
                console.log('search');
            },
        },
        {
            label: 'Se déconnecter',
            command: () => {
                this.sidebarVisible = false;
                this.authService.logout();
            },
        },
    ];

    goTo() {
        this.selectedItem.command();
    }
}
