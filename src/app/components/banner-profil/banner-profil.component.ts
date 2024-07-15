import { Component, ElementRef, Input, SecurityContext, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { MessageService } from 'primeng/api';
import { ProfilService } from '../../services/profil/profil.service';
import { AuthService } from '../../services/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { PoisService } from '../../services/pois/pois.service';

@Component({
    selector: 'app-banner-profil',
    standalone: true,
    imports: [NgOptimizedImage, NgIf, ToastModule],
    providers: [MessageService],
    templateUrl: './banner-profil.component.html',
    styleUrl: './banner-profil.component.css',
})
export class BannerProfilComponent {
    @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
    @Input() banner?: string | null;
    @Input() isHoveredBanner: boolean = false;

    constructor(
        private messageService: MessageService,
        private profilService: ProfilService,
        private authServices: AuthService,
        private sanitizer: DomSanitizer,
    ) {}

    private getImageValue(event: Event): File {
        const file = (event.target as HTMLInputElement).files as FileList;
        this.banner = this.sanitizer.sanitize(
            SecurityContext.RESOURCE_URL,
            this.sanitizer.bypassSecurityTrustResourceUrl(
                URL.createObjectURL(file.item(0)!.slice()),
            ),
        );
        return file.item(0)!;
    }

    triggerFileInput() {
        this.fileInput.nativeElement.click();
    }

    get isPoi(): boolean {
        return this.authServices.user?.poiId !== null;
    }

    submitFile(event: Event): void {
        const fileUpload = this.getImageValue(event);
        if (!fileUpload) {
            this.messageService.add({
                severity: 'error',
                summary: "Erreur lors de l'enregistrement de la bannière",
                detail: 'Une image doit être sélectionnée pour enregistrer la bannière.',
                life: 5000,
            });
            return;
        }
        this.profilService.uploadBanner(fileUpload).subscribe({
            next: (value: any) => {
                const user: User = JSON.parse(
                    (localStorage.getItem('user') as string) ??
                        (sessionStorage.getItem('user') as string),
                );
                user.banner = { url: value.pic };
                localStorage.setItem('user', JSON.stringify(user));
                this.authServices.setUser(user);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Bannière modifiée',
                    detail: 'Votre nouvelle bannière a été enregistrée !',
                    life: 5000,
                });
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: "Erreur lors de l'enregistrement de la bannière",
                    detail: err.message,
                    life: 5000,
                });
            },
        });
    }
}
