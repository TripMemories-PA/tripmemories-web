import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MenuModule } from 'primeng/menu';

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
        NgClass,
        MenuModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {
    private subscriptions: Subscription = new Subscription();
    constructor(
        public auth: AuthService,
        private router: Router,
    ) {}

    showBackgroundColor: boolean = true;

    search = {
        input: '',
    };

    items: MenuItem[] | undefined;
    itemsSearch: MenuItem[] = [];
    showSearchInput: boolean = false;

    ngOnChanges() {
        this.ngOnInit();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    get poiAvatar(): string | undefined {
        return sessionStorage.getItem('poiAvatar') ?? undefined;
    }

    ngOnInit() {
        this.itemsSearch = [
            {
                label: 'Recherche par ville',
                style: {
                    color: 'black',
                },
                routerLink: ['/search-city'],
            },
            {
                label: 'Recherche par lieu',
                style: {
                    color: 'black',
                },
                routerLink: ['/search'],
            },
        ];
        this.updateMenuItems();
        this.subscriptions.add(
            this.auth.user$.subscribe(() => {
                this.updateMenuItems();
            }),
        );
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const url = event.urlAfterRedirects;
                this.showBackgroundColor = !(
                    url.includes('/search-city') ||
                    url.includes('/search') ||
                    url.includes('/profil') ||
                    url.includes('/user') ||
                    url.includes('/poi') ||
                    url.includes('/meets') ||
                    url.includes('/conversations') ||
                    url.includes('/login') ||
                    url.includes('/register')
                );
            }
        });
    }

    updateMenuItems() {
        this.items = [
            {
                label: "Fil d'actualité",
                style: {
                    color: 'white',
                },
                routerLink: ['/'],
            },
            {
                label: 'Classement',
                style: {
                    color: 'white',
                },
                routerLink: ['/ranking'],
            },
            {
                label: 'Profil',
                style: {
                    color: 'white',
                },
                routerLink: ['/profil'],
            },
        ];
        if (this.auth.user?.userTypeId === 3) {
            this.items.push({
                label: 'Magasin',
                style: {
                    color: 'white',
                },
                routerLink: ['/shop'],
            });
        }
        if (this.auth.user?.userTypeId === 2) {
            this.items.push({
                label: 'Mon Panier',
                style: {
                    color: 'white',
                },
                routerLink: ['/basket'],
            });
        }
        this.items.push({
            label: 'Rechercher',
            styleClass: 'white-menu-icon',
            style: {
                color: 'white',
            },
            items: this.itemsSearch,
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
        this.router.navigate(['/search'], { queryParams: { search: this.search.input } });
    }

    disconnect() {
        this.auth.logout();
    }
}
