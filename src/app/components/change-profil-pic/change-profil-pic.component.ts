import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfilService } from '../../services/profil/profil.service';
import { AuthService } from '../../services/auth/auth.service';
import { ImageInputUtils } from '../../../libs/ImageInputUtils';
import { FileModel } from '../../models/file.model';
import { PictureServerComponent } from '../picture-server/picture-server.component';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-change-profil-pic',
    standalone: true,
    imports: [PictureServerComponent, InputIconModule, ButtonModule, NgIf, ProgressSpinnerModule],
    templateUrl: './change-profil-pic.component.html',
    styleUrl: './change-profil-pic.component.css',
})
export class ChangeProfilPicComponent {
    picture: FileModel = {
        picture: undefined,
    };
    pictureURL: any;
    ok: string | undefined = undefined;
    error: string | undefined = undefined;

    isLoading: boolean = false;

    imgCompil = this.image;
    constructor(
        private image: ImageInputUtils,
        private sanitizer: DomSanitizer,
        private profilService: ProfilService,
        private authService: AuthService,
    ) {}

    @Input() profilPicOnServer: string | undefined = undefined;

    getValue(event: Event): File {
        const file = (event.target as HTMLInputElement).files as FileList;
        this.pictureURL = this.sanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(file.item(0)!.slice()),
        );
        return file.item(0)!;
    }

    submitFile(): void {
        this.error = undefined;
        if (this.isLoading) return;
        if (!this.imgCompil.FileUpload) {
            this.error = 'Veuillez sélectionner une image';
            return;
        }
        this.isLoading = true;
        this.profilService.uploadImage(this.imgCompil.FileUpload).subscribe({
            next: (value: any) => {
                this.isLoading = false;
                this.ok = 'Image enregistrée';

                const user: User = JSON.parse(localStorage.getItem('user') as string);
                user.avatar = { url: value.pic };
                localStorage.setItem('user', JSON.stringify(user));
                this.authService.setUser(user);

                setTimeout(() => {
                    this.ok = undefined;
                }, 3000);
            },
            error: (err) => {
                this.isLoading = false;
                this.error = err.message;
            },
        });
    }
}
