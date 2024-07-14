import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-backoffice-sidenav',
    standalone: true,
    imports: [SidebarModule, ButtonModule, ListboxModule, FormsModule],
    templateUrl: './backoffice-sidenav.component.html',
    styleUrl: './backoffice-sidenav.component.css',
})
export class BackofficeSidenavComponent {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    sidebarVisible = false;
    selectedItem: any;

    items = [
        {
            label: 'Comptes utilisateurs',
            command: () => {
                this.router.navigate(['/backoffice']);
            },
        },
        {
            label: 'Comptes POI',
            command: () => {
                this.router.navigate(['/backoffice']);
            },
        },
        {
            label: "Points d'intérêts (POI)",
            command: () => {
                this.router.navigate(['/backoffice/pois']);
            },
        },
        {
            label: 'Posts',
            command: () => {
                this.router.navigate(['/backoffice/posts']);
            },
        },
        {
            label: 'Commentaires',
            command: () => {
                this.router.navigate(['/backoffice/comments']);
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
