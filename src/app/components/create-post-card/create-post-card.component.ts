import { Component, Input, OnInit } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipsModule } from 'primeng/chips';
import { PostsService } from '../../services/posts/posts.service';
import { Router } from '@angular/router';
import { PostCreationModel } from '../../models/request/post.model';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { NgIf } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { PoiModel } from '../../models/Poi.model';
import { DropdownModule } from 'primeng/dropdown';
import { PoisService } from '../../services/pois/pois.service';

@Component({
    selector: 'app-create-post-card',
    standalone: true,
    imports: [
        RatingModule,
        InputTextModule,
        FileUploadModule,
        InputTextareaModule,
        ChipsModule,
        FormsModule,
        MessageModule,
        NgIf,
        MultiSelectModule,
        DropdownModule,
    ],
    templateUrl: './create-post-card.component.html',
    styleUrl: './create-post-card.component.css',
})
export class CreatePostCardComponent implements OnInit {
    constructor(
        private postService: PostsService,
        private poiService: PoisService,
        private router: Router,
    ) {}

    file: File | null = null;
    error: string | null = null;
    success: string | null = null;
    loading: boolean = false;
    loadingPoi: boolean = false;
    poi: PoiModel[] = [];
    selectedPoi?: PoiModel;

    @Input() inputPoiId?: number;
    @Input() inputPoiName?: string;

    post: PostCreationModel = {
        title: '',
        content: '',
        imageId: 0,
        poiId: this.inputPoiId ?? -1,
        note: undefined,
    };

    onUpload(event: FileSelectEvent) {
        this.file = event.currentFiles[0];
    }

    updatePoiId() {
        this.post.poiId = this.selectedPoi?.id ?? -1;
    }

    submitPost() {
        this.loading = true;
        if (!this.file) {
            console.log('no file');
            this.error = 'Veuillez ajouter une image';
            this.loading = false;
            return;
        }
        if (
            !this.post.title ||
            !this.post.content ||
            this.post.note === undefined ||
            !this.post.poiId ||
            this.post.poiId === -1
        ) {
            console.log('missing fields');
            this.error = 'Tout les champs sont obligatoires';
            this.loading = false;
            return;
        }
        const formData: FormData = new FormData();
        formData.append('file', this.file, this.file.name);
        this.postService.sendImagePost(formData).subscribe({
            next: (response) => {
                this.post.imageId = response.id;
                this.postService.createPost(this.post).subscribe({
                    next: (_) => {
                        this.success = 'Post créé avec succès, la page va se recharger';
                        this.loading = false;
                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                    },
                    error: (error) => {
                        this.loading = false;
                        this.error = 'Une erreur est survenue lors de la création du post';
                        console.error(error);
                    },
                });
            },
            error: (error) => {
                this.loading = false;
                this.error = "Une erreur est survenue lors de l'envoi de l'image";
                console.error(error);
            },
        });
    }

    ngOnInit(): void {
        this.loadingPoi = true;
        if (this.inputPoiId && this.inputPoiName) {
            return;
        }
        this.poiService.getPOIs('1', '100000000').subscribe({
            next: (response) => {
                this.loadingPoi = false;
                this.poi = response.data;
            },
            error: (error) => {
                this.loadingPoi = false;
                console.error(error);
            },
        });
    }
}
