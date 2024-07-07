import { Component, HostListener, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { PostCardFeedComponent } from '../../components/post-card-feed/post-card-feed.component';
import { MonumentCardFeedComponent } from '../../components/monument-card-feed/monument-card-feed.component';
import { PostsService } from '../../services/posts/posts.service';
import { PostModel } from '../../models/post.model';
import { NgForOf, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { MessageModule } from 'primeng/message';
import { Router } from '@angular/router';

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
    ],
    templateUrl: './feed-page.component.html',
    styleUrl: './feed-page.component.css',
})
export class FeedPageComponent implements OnInit {
    constructor(
        private postsService: PostsService,
        private authServices: AuthService,
        private router: Router,
    ) {}

    posts: PostModel[] = [];
    number = 2;
    isEnd = false;
    searchValue = '';

    ngOnInit(): void {
        this.getPosts();
    }

    getPosts() {
        this.postsService
            .getPosts('10', this.authServices.user?.access_token !== undefined)
            .subscribe({
                next: (posts) => {
                    this.posts = posts.data;
                },
                error: (error) => {
                    console.error(error);
                },
            });
    }

    getNextPosts() {
        this.postsService
            .getPosts(
                '10',
                this.authServices.user?.access_token !== undefined,
                this.number.toString(),
            )
            .subscribe({
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
