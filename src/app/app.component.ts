import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HeaderComponent } from './components/header/header.component';
import { NgIf } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
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
export class AppComponent implements OnInit, OnDestroy {
    title = 'TripMemories';
    showHeaderFooter: boolean = true;
    showBackofficeSidenav: boolean = false;
    subscription?: Subscription;

    constructor(
        private router: Router,
        private config: PrimeNGConfig,
        private translateService: TranslateService,
    ) {}
    ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const url = event.urlAfterRedirects;
                this.showHeaderFooter = !(
                    url === '/login' ||
                    url === '/register' ||
                    url === '/forgotPassword'
                );

                const user = JSON.parse(
                    (localStorage.getItem('user') as string) ??
                        (sessionStorage.getItem('user') as string),
                );
                if (user?.userTypeId && user?.userTypeId === UserTypes.ADMIN) {
                    this.showHeaderFooter = false;
                    this.showBackofficeSidenav = true;
                } else {
                    this.showBackofficeSidenav = false;
                }
            }
        });
        this.translateService.setDefaultLang('fr');
        this.translate('fr');
    }

    translate(lang: string) {
        this.translateService.use(lang);
        this.translateService
            .get('primeng')
            .subscribe((res: any) => this.config.setTranslation(res));
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
