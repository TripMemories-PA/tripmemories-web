import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        MenubarModule,
        NgOptimizedImage,
        ButtonModule,
        NgIf,
        InputIconModule,
        InputTextModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    constructor(
        public auth: AuthService,
        private router: Router,
    ) {}

    showBackgroundColor: boolean = true;

    search = {
        input: '',
    };

    items: MenuItem[] | undefined;
    showSearchInput: boolean = false;

    ngOnInit() {
        this.items = [
            /*            {
                label: 'Carte',
                style: {
                    color: 'white',
                },
                routerLink: ['/'],
            },*/
            {
                label: 'Feed',
                style: {
                    color: 'white',
                },
                routerLink: ['/'],
            },
            {
                label: 'Magasin',
                style: {
                    color: 'white',
                },
                routerLink: ['/shop'],
            },
            {
                label: 'Mon Panier',
                style: {
                    color: 'white',
                },
                routerLink: ['/basket'],
            },
            {
                label: 'Profil',
                style: {
                    color: 'white',
                },
                routerLink: ['/profil'],
            },
        ];
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const url = event.urlAfterRedirects;
                this.showBackgroundColor = !(
                    url.includes('/search-city') ||
                    url.includes('/search') ||
                    url.includes('/profil') ||
                    url.includes('/user') ||
                    url.includes('/poi')
                );
            }
        });
    }

    toggleSearchInput() {
        this.showSearchInput = !this.showSearchInput;
    }

    goTo(path: string) {
        this.router.navigate([path]);
    }

    searchCity() {
        if (!this.search.input) {
            window.location.href = '/search-city';
        }
        this.router.navigate(['/search-city'], { queryParams: { search: this.search.input } });
    }

    disconnect() {
        this.auth.logout();
    }
}
