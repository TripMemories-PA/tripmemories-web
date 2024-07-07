import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PoisService } from '../../services/pois/pois.service';
import { PoiModel } from '../../models/Poi.model';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { PostModel } from '../../models/post.model';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { ImageServiceService } from '../../services/image-service.service';
import { CurrentlyAtCardComponent } from '../../components/currently-at-card/currently-at-card.component';
import { CreatePostCardComponent } from '../../components/create-post-card/create-post-card.component';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { BuyTicketPoiCardComponent } from '../../components/buy-ticket-poi-card/buy-ticket-poi-card.component';
import { TicketModel } from '../../models/ticket.model';

@Component({
    selector: 'app-poi-page',
    standalone: true,
    imports: [
        NgOptimizedImage,
        PostCardComponent,
        RouterLink,
        NgForOf,
        NgIf,
        CurrentlyAtCardComponent,
        CreatePostCardComponent,
        DialogModule,
        SharedModule,
        ButtonModule,
        BuyTicketPoiCardComponent,
    ],
    templateUrl: './poi-page.component.html',
    styleUrl: './poi-page.component.css',
})
export class PoiPageComponent implements OnInit {
    @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;
    @ViewChild('scrollContainerTicket', { static: true }) scrollContainerTicket!: ElementRef;

    poi: PoiModel = new PoiModel();
    poiPosts: PostModel[] = [];
    poiNear: PoiModel[] = [];

    widthImage: number = 1;
    heightImage: number = 1;
    showDialog: boolean = false;
    showDialogQuiz: boolean = false;

    tickets: TicketModel[] = [];

    constructor(
        private _activatedRoute: ActivatedRoute,
        private router: Router,
        private poisService: PoisService,
        private imageService: ImageServiceService,
    ) {}
    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params) => {
            const param = params.get('id');
            this.getPoiDetails(param);
            this.getPoiPosts(param);
            this.getPoiTickets(param);
        });
    }

    getPoiDetails(id: string | null): void {
        if (!id) {
            return;
        }
        this.poisService.getPOI(id).subscribe({
            next: (response) => {
                this.poi = response;
                this.getPoiNear();
                this.imageService
                    .getImageDimensions(response.cover?.url)
                    .then((dimensions) => {
                        this.widthImage = dimensions.width;
                        this.heightImage = dimensions.height;
                    })
                    .catch((error) => {
                        console.error('Error loading image:', error);
                    });
            },
            error: (error) => {
                console.error(error);
            },
        });
    }

    getPoiPosts(id: string | null): void {
        if (!id) {
            return;
        }
        this.poisService.getPoiPosts(id, '5').subscribe({
            next: (response) => {
                this.poiPosts = response.data;
            },
            error: (error) => {
                console.error(error);
            },
        });
    }

    getPoiTickets(id: string | null): void {
        if (!id) {
            return;
        }
        this.poisService.getPoisTickets(id).subscribe({
            next: (response) => {
                this.tickets = response;
            },
            error: (error) => {
                console.error(error);
            },
        });
    }

    openDialog() {
        this.showDialog = true;
    }

    openDialogQuiz() {
        this.showDialogQuiz = true;
    }

    goToQuiz(difficulty: string = 'medium') {
        this.router.navigate(['/quiz', this.poi.id], {
            queryParams: { difficulty: difficulty },
        });
    }

    getPoiNear() {
        this.poisService.getPOIs('1', '10', this.poi.latitude, this.poi.longitude, '10').subscribe({
            next: (response) => {
                this.poiNear = response.data.filter((poi) => poi.id !== this.poi.id);
            },
            error: (error) => {
                console.error(error);
            },
        });
    }

    scrollLeft(): void {
        this.scrollContainer.nativeElement.scrollBy({
            left: -200, // Défilement à gauche par 200 pixels
            behavior: 'smooth',
        });
    }

    scrollRight(): void {
        this.scrollContainer.nativeElement.scrollBy({
            left: 200, // Défilement à droite par 200 pixels
            behavior: 'smooth',
        });
    }

    scrollLeftTicket(): void {
        this.scrollContainerTicket.nativeElement.scrollBy({
            left: -200, // Défilement à gauche par 200 pixels
            behavior: 'smooth',
        });
    }

    scrollRightTicket(): void {
        this.scrollContainerTicket.nativeElement.scrollBy({
            left: 200, // Défilement à droite par 200 pixels
            behavior: 'smooth',
        });
    }
}
