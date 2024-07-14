import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { PostsService } from '../../services/posts/posts.service';

@Component({
    selector: 'app-posts-backoffice-page',
    standalone: true,
    imports: [TableModule, CommonModule, ButtonModule, DialogModule, ImageModule],
    templateUrl: './posts-backoffice-page.component.html',
    styleUrl: './posts-backoffice-page.component.css',
})
export class PostsBackofficePageComponent implements OnInit {
    constructor(private postService: PostsService) {}

    posts: any[] = [];
    itemsPerPage: number = 10;
    currentPage: number = 1;
    totalPages: number = 0;
    search: string = '';
    loading: boolean = false;
    dialogImage: boolean = false;
    selectedImage: string = '';
    dialogContent: boolean = false;
    selectedContent: string = '';

    ngOnInit(): void {
        this.getPosts();
    }

    getPosts() {
        this.loading = true;
        this.postService
            .getPosts(this.itemsPerPage.toString(), true, this.currentPage.toString())
            .subscribe((res) => {
                this.posts = res.data;
                this.totalPages = res.meta.total;
                this.loading = false;
            });
    }

    onPageChange(event: any) {
        if (event.first === 0) {
            this.currentPage = 1;
            this.itemsPerPage = event.rows;
        } else {
            this.itemsPerPage = event.rows;
            this.currentPage = event.first / this.itemsPerPage + 1;
        }

        this.getPosts();
    }

    deletePost(id: number) {
        this.postService.deletePost(id).subscribe(() => {
            this.getPosts();
        });
    }

    openImageDialog(image: string) {
        this.selectedImage = image;
        this.dialogImage = true;
    }

    openContentDialog(content: string) {
        this.selectedContent = content;
        this.dialogContent = true;
    }
}
