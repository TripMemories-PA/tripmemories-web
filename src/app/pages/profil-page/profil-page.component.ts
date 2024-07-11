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
import { BannerProfilComponent } from '../../components/banner-profil/banner-profil.component';
import { MyTicketsComponent } from '../../container/profil/my-tickets/my-tickets.component';
import { MyQuizComponent } from '../../container/profil/my-quiz/my-quiz.component';

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
        BannerProfilComponent,
        MyTicketsComponent,
        MyQuizComponent,
    ],
    templateUrl: './profil-page.component.html',
    styleUrl: './profil-page.component.css',
})
export class ProfilPageComponent implements OnInit {
    profilPic: string | undefined = undefined;
    nbrFriends: number = 0;
    nbrPoints: number = 0;
    nbrMonuments?: number = 0;
    banner: string | undefined | null = undefined;
    activeTab: string = 'posts';
    isHoveredBanner: boolean = false;
    user: User = JSON.parse(localStorage.getItem('user') as string);
    userType: number = -1;
    poiId: number = -1;

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
                this.authServices.setUser(user);
                if (user.userTypeId) {
                    this.userType = user.userTypeId;
                }
                this.user = user;
                this.nbrMonuments = user.poisCount;
                this.nbrPoints = user.score ?? 0;
                this.banner = user.banner?.url;
                if (user.poiId) {
                    this.poiId = user.poiId as number;
                }
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
