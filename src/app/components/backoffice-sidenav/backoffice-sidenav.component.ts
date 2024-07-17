import { Component, OnInit } from '@angular/core';
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
export class BackofficeSidenavComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    sidebarVisible = false;
    selectedItem: any;

    items = [
        {
            label: 'Comptes utilisateurs',
            route: '/backoffice/users',
            command: () => {
                this.router.navigate(['/backoffice/users']);
            },
        },
        {
            label: 'Comptes POI',
            route: '/backoffice/pois-accounts',
            command: () => {
                this.router.navigate(['/backoffice/pois-accounts']);
            },
        },
        {
            label: "Points d'intérêts (POI)",
            route: '/backoffice/pois',
            command: () => {
                this.router.navigate(['/backoffice/pois']);
            },
        },
        {
            label: 'Posts',
            route: '/backoffice/posts',
            command: () => {
                this.router.navigate(['/backoffice/posts']);
            },
        },
        {
            label: 'Commentaires',
            route: '/backoffice/comments',
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

    ngOnInit(): void {
        const url = this.router.url;
        this.selectedItem = this.items.find((item) => {
            return item.route === url;
        });
    }

    goTo() {
        this.selectedItem.command();
    }
}
