import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HeaderComponent } from './components/header/header.component';
import { NgIf } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ButtonModule, InputTextModule, HeaderComponent, NgIf, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    title = 'TripMemories';
    showHeaderFooter: boolean = true;
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
            }
        });
        this.translate('fr');
    }

    translate(lang: string) {
        this.translateService.use(lang);
        this.translateService.get('primeng').subscribe((res) => this.config.setTranslation(res));
    }
}
