import { Component, HostListener, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { PostCardFeedComponent } from '../../components/post-card-feed/post-card-feed.component';
import { MonumentCardFeedComponent } from '../../components/monument-card-feed/monument-card-feed.component';
import { PostsService } from '../../services/posts/posts.service';
import { PostModel } from '../../models/post.model';
import { NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { MessageModule } from 'primeng/message';
import { Router } from '@angular/router';
import { FriendsService } from '../../services/friends/friends.service';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-feed-page',
    standalone: true,
    imports: [
        InputTextModule,
        PaginatorModule,
        PostCardFeedComponent,
        MonumentCardFeedComponent,
        NgForOf,
        MessageModule,
        NgIf,
        NgSwitch,
        NgSwitchCase,
        TabMenuModule,
    ],
    templateUrl: './feed-page.component.html',
    styleUrl: './feed-page.component.css',
})
export class FeedPageComponent implements OnInit {
    constructor(
        private postsService: PostsService,
        private authServices: AuthService,
        private friendsService: FriendsService,
        private router: Router,
    ) {}

    posts: PostModel[] = [];
    number = 2;
    isEnd = false;
    searchValue = '';
    items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    ngOnInit(): void {
        this.items = [{ label: 'Pour vous' }];
        if (this.authServices.user?.access_token !== undefined) {
            this.items.push({ label: 'Amis' });
        }
        this.activeItem = this.items[0];
        this.getGeneralPosts();
    }

    onActiveItemChange(event: MenuItem) {
        this.activeItem = event;
        if (event.label === 'Pour vous') {
            this.setActiveTab('general');
        } else {
            this.setActiveTab('friends');
        }
    }

    private setActiveTab(tab: string) {
        if (tab === 'friends') {
            this.getPosts();
        } else {
            this.getGeneralPosts();
        }
    }

    get isAuth() {
        return this.authServices.user?.access_token !== undefined;
    }

    getPosts(page: number = 1, perPage: number = 10) {
        this.posts = [];
        this.isEnd = false;
        this.friendsService.getFriendsPost(page, perPage).subscribe({
            next: (posts) => {
                if (posts.data.length === 0) {
                    this.isEnd = true;
                    return;
                }
                this.posts = posts.data;
            },
            error: (error) => {
                console.error(error);
            },
        });
    }

    getGeneralPosts(page: number = 1, perPage: number = 10) {
        this.posts = [];
        this.isEnd = false;
        this.postsService.getPosts(perPage.toString(), this.isAuth).subscribe({
            next: (posts) => {
                if (posts.data.length === 0) {
                    this.isEnd = true;
                    return;
                }
                this.posts = posts.data;
            },
            error: (error) => {
                console.error(error);
            },
        });
    }

    getNextPosts() {
        if (this.items && this.activeItem === this.items[1]) {
            this.friendsService.getFriendsPost(this.number, 10).subscribe({
                next: (posts) => {
                    if (posts.data.length === 0) {
                        this.isEnd = true;
                        return;
                    }
                    this.posts = this.posts.concat(posts.data);
                    this.number += 1;
                },
                error: (error) => {
                    console.error(error);
                },
            });
        } else if (this.items && this.activeItem === this.items[0]) {
            this.postsService.getPosts('10', false, this.number.toString()).subscribe({
                next: (posts) => {
                    if (posts.data.length === 0) {
                        this.isEnd = true;
                        return;
                    }
                    this.posts = this.posts.concat(posts.data);
                    this.number += 1;
                },
                error: (error) => {
                    console.error(error);
                },
            });
        }
    }

    search() {
        if (!this.searchValue) {
            this.router.navigate(['/search']);
            return;
        }
        this.router.navigate(['/search'], { queryParams: { search: this.searchValue } });
    }

    @HostListener('window:scroll', ['$event'])
    onScroll() {
        const offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

        if (offsetHeight + scrollTop >= scrollHeight) {
            this.getNextPosts();
        }
    }
}
