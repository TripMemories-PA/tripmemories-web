import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { ProfilService } from '../../services/profil/profil.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { UpdateMeModel } from '../../models/updateme.model';
import { DialogModule } from 'primeng/dialog';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';
import { UpdatePoiComponent } from '../update-poi/update-poi.component';
import { PoisService } from '../../services/pois/pois.service';
import { PoiModel } from '../../models/Poi.model';

@Component({
    selector: 'app-my-informations',
    standalone: true,
    imports: [
        CardModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        NgIf,
        ProgressBarModule,
        DialogModule,
        NgOptimizedImage,
        CreateTicketComponent,
        UpdatePoiComponent,
    ],
    templateUrl: './my-informations.component.html',
    styleUrl: './my-informations.component.css',
})
export class MyInformationsComponent implements OnInit {
    ok: string | null = null;
    error: string | null = null;

    isLoading: boolean = false;

    visible: boolean = false;
    visiblePoi: boolean = false;
    modifyAccount: boolean = false;

    @Input() user?: User;
    @Input() nbrFriends?: number;
    @Input() nbrMonuments?: number;
    @Input() nbrPoints?: number;

    poi: PoiModel = new PoiModel();
    poiId: number = -1;

    userValues: User = {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
    };

    constructor(
        private profilServices: ProfilService,
        private router: Router,
        private authService: AuthService,
        private poiService: PoisService,
    ) {}

    closeDialog() {
        this.visiblePoi = false;
        if (this.user?.poiId) {
            this.poiService.getPOI(this.user.poiId as string).subscribe({
                next: (res) => {
                    this.poi = res;
                    this.poiId = res.id as number;
                },
                error: (err) => {
                    console.error(err);
                },
            });
        }
    }

    goToPoi() {
        this.router.navigate(['/poi', this.poiId]);
    }

    ngOnInit(): void {
        if (this.user) {
            this.userValues = this.user;
            if (this.user.userType?.id === 3) {
                this.poiService.getPOI(this.user.poiId as string).subscribe({
                    next: (res) => {
                        this.poi = res;
                        this.poiId = res.id as number;
                    },
                    error: (err) => {
                        console.error(err);
                    },
                });
            }
        }
    }

    submit(): void {
        if (this.isLoading) return;
        this.error = null;
        this.isLoading = true;
        this.profilServices.updateMe(this.userValues).subscribe({
            next: (res: UpdateMeModel) => {
                this.isLoading = false;
                this.ok = 'Changement effectué avec succès';
                this.updateLocalStorage(res);
                setTimeout(() => {
                    this.ok = null;
                }, 3000);
            },
            error: (err: Error) => {
                this.isLoading = false;
                this.error = err.message;
            },
        });
    }

    private updateLocalStorage(user: UpdateMeModel): void {
        const userLocalStorage: User = JSON.parse(
            (localStorage.getItem('user') as string) ?? (sessionStorage.getItem('user') as string),
        );
        userLocalStorage.firstname = user.firstname;
        userLocalStorage.lastname = user.lastname;
        userLocalStorage.email = user.email;
        userLocalStorage.username = user.username;
        this.authService.user!.access_token = userLocalStorage.access_token;
        localStorage.setItem('user', JSON.stringify(userLocalStorage));
    }

    deleteMe() {
        this.profilServices.deleteMe().subscribe({
            next: () => {
                this.authService.logout();
                this.router.navigate(['/login']);
            },
            error: (err: any) => {
                this.error = err.message;
            },
        });
    }
}
