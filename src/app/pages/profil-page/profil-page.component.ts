import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../services/profil/profil.service';
import { AuthService } from '../../services/auth/auth.service';
import { ProfilInfoComponent } from '../../components/profil-info/profil-info.component';
import { NgIf, NgOptimizedImage, NgSwitch, NgSwitchCase } from '@angular/common';
import { FriendsService } from '../../services/friends/friends.service';
import { MyPostsComponent } from '../../container/profil/my-posts/my-posts.component';
import { MyFriendsComponent } from '../../container/profil/my-friends/my-friends.component';
import { MyProfilComponent } from '../../container/profil/my-profil/my-profil.component';
import { User } from '../../models/user';

@Component({
    selector: 'app-profil-page',
    standalone: true,
    imports: [
        ProfilInfoComponent,
        NgSwitch,
        NgSwitchCase,
        MyPostsComponent,
        MyFriendsComponent,
        MyProfilComponent,
        NgOptimizedImage,
        NgIf,
    ],
    templateUrl: './profil-page.component.html',
    styleUrl: './profil-page.component.css',
})
export class ProfilPageComponent implements OnInit {
    profilPic: string | undefined = undefined;
    nbrFriends: number = 0;
    nbrMonuments?: number = 0;
    banner: string | undefined = undefined;
    activeTab: string = 'posts';
    isHoveredBanner: boolean = false;
    user: User = JSON.parse(localStorage.getItem('user') as string);

    setActiveTab(tab: string) {
        this.activeTab = tab;
    }

    constructor(
        private profilService: ProfilService,
        private friendsService: FriendsService,
        private authServices: AuthService,
    ) {
        const user = JSON.parse(localStorage.getItem('user') as string);
        if (!this.authServices.user?.access_token) {
            this.authServices.logout();
            return;
        }
        if (this.authServices.user?.avatar) {
            this.profilPic = user.avatar.url;
        }
    }

    ngOnInit(): void {
        this.profilService.getMe().subscribe({
            next: (user) => {
                user.access_token = this.authServices.user?.access_token;
                this.authServices.user = user;
                this.user = user;
                this.nbrMonuments = user.poisCount;
                this.banner = user.banner?.url;
                localStorage.setItem('user', JSON.stringify(user));
                if (this.authServices.user?.avatar) {
                    this.profilPic = user.avatar?.url;
                }
            },
        });

        this.friendsService.getFriends().subscribe({
            next: (friends) => {
                this.nbrFriends = friends.data.length;
            },
            error: (error) => {
                console.error(error);
            },
        });
    }
}
