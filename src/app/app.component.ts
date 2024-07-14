import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HeaderComponent } from './components/header/header.component';
import { NgIf } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { UserTypes } from './models/enum/UserTypes';
import { BackofficeSidenavComponent } from './components/backoffice-sidenav/backoffice-sidenav.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        ButtonModule,
        InputTextModule,
        HeaderComponent,
        NgIf,
        FooterComponent,
        BackofficeSidenavComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    title = 'TripMemories';
    showHeaderFooter: boolean = true;
    showBackofficeSidenav: boolean = false;
    constructor(private router: Router) {}
    ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const url = event.urlAfterRedirects;
                this.showHeaderFooter = !(
                    url === '/login' ||
                    url === '/register' ||
                    url === '/forgotPassword'
                );

                const user = JSON.parse(localStorage.getItem('user') as string);
                if (user?.userTypeId && user?.userTypeId === UserTypes.ADMIN) {
                    this.showHeaderFooter = false;
                    this.showBackofficeSidenav = true;
                } else {
                    this.showBackofficeSidenav = false;
                }
            }
        });
    }
}
