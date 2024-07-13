import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PoisService } from '../../services/pois/pois.service';
import { PoiModel } from '../../models/Poi.model';
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
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
import { CreateMeetCardComponent } from '../../components/create-meet-card/create-meet-card.component';
import { MeetModel } from '../../models/meet.model';
import { MeetCardPoiComponent } from '../../components/meet-card-poi/meet-card-poi.component';

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
        NgClass,
        CreateMeetCardComponent,
        MeetCardPoiComponent,
    ],
    templateUrl: './poi-page.component.html',
    styleUrl: './poi-page.component.css',
})
export class PoiPageComponent implements OnInit, AfterViewInit {
    @ViewChild('scrollContainer') scrollContainer!: ElementRef;
    @ViewChild('containerTicket') scrollContainerTicket!: ElementRef;
    @ViewChild('scrollContainerMeet') scrollContainerMeet!: ElementRef;

    @ViewChild('leftButton', { static: true }) leftButton!: ElementRef;
    @ViewChild('rightButton', { static: true }) rightButton!: ElementRef;

    @ViewChild('leftButtonTicket', { static: true }) leftButtonTicket!: ElementRef;
    @ViewChild('rightButtonTicket', { static: true }) rightButtonTicket!: ElementRef;

    @ViewChild('leftButtonMeet', { static: true }) leftButtonMeet!: ElementRef;
    @ViewChild('rightButtonMeet', { static: true }) rightButtonMeet!: ElementRef;

    poi: PoiModel = new PoiModel();
    poiPosts: PostModel[] = [];
    poiNear: PoiModel[] = [];

    widthImage: number = 1;
    heightImage: number = 1;
    showDialog: boolean = false;
    showDialogQuiz: boolean = false;
    showDialogMeet: boolean = false;
    nbrQuestions: number = 0;

    tickets: TicketModel[] = [];
    meets: MeetModel[] = [];

    isAtLeftEnd: boolean = true;
    isAtRightEnd: boolean = false;

    isAtLeftEndTicket: boolean = true;
    isAtRightEndTicket: boolean = false;

    isAtLeftEndMeet: boolean = true;
    isAtRightEndMeet: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private router: Router,
        private poisService: PoisService,
        private imageService: ImageServiceService,
        private cdr: ChangeDetectorRef,
    ) {}
    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params) => {
            const param = params.get('id');
            this.getPoiDetails(param);
            this.getPoiTickets(param);
            this.getPoiPosts(param);
            this.getPoiMeet(param);
        });
    }

    ngAfterViewInit() {
        if (this.scrollContainer) {
            this.checkScrollPosition();
            this.scrollContainer.nativeElement.addEventListener('scroll', () =>
                this.checkScrollPosition(),
            );
        } else {
            this.isAtLeftEnd = true;
            this.isAtRightEnd = true;
        }
        if (this.scrollContainerTicket) {
            this.checkScrollPositionTicket();
            this.scrollContainerTicket.nativeElement.addEventListener('scroll', () =>
                this.checkScrollPositionTicket(),
            );
        } else {
            this.isAtRightEndTicket = true;
            this.isAtLeftEndTicket = true;
        }

        if (this.scrollContainerMeet) {
            this.checkScrollPositionMeet();
            this.scrollContainerMeet.nativeElement.addEventListener('scroll', () =>
                this.checkScrollPositionMeet(),
            );
        } else {
            this.isAtRightEndMeet = true;
            this.isAtLeftEndMeet = true;
        }

        this.cdr.detectChanges();
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
        this.poisService.getPoiQuestions(id).subscribe({
            next: (response) => {
                this.nbrQuestions = response.meta.total;
            },
        });
    }

    getPoiPosts(id: string | null): void {
        if (!id) {
            return;
        }
        this.poisService.getPoiPosts(id, '10').subscribe({
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

    getPoiMeet(id: string | null): void {
        if (!id) {
            return;
        }
        this.poisService.getPoiMeets(id).subscribe({
            next: (response) => {
                this.meets = response.data;
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

    openDialogMeet() {
        this.showDialogMeet = true;
    }

    goToQuiz(difficulty: string = 'medium') {
        this.router.navigate(['/quiz', this.poi.id], {
            queryParams: { difficulty: difficulty },
        });
    }

    reloadMeets() {
        if (!this.poi.id) {
            return;
        }
        this.showDialogMeet = false;
        this.getPoiMeet(this.poi.id.toString());
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
        if (!this.scrollContainer) {
            return;
        }
        this.scrollContainer.nativeElement.scrollBy({
            left: -200,
            behavior: 'smooth',
        });
        setTimeout(() => this.checkScrollPosition(), 300);
    }

    scrollRight(): void {
        if (!this.scrollContainer) {
            return;
        }
        this.scrollContainer.nativeElement.scrollBy({
            left: 200,
            behavior: 'smooth',
        });
        setTimeout(() => this.checkScrollPosition(), 300);
    }

    scrollLeftTicket(): void {
        if (!this.scrollContainerTicket) {
            return;
        }
        this.scrollContainerTicket.nativeElement.scrollBy({
            left: -200,
            behavior: 'smooth',
        });
        setTimeout(() => this.checkScrollPositionTicket(), 300);
    }

    scrollRightTicket(): void {
        if (!this.scrollContainerTicket) {
            return;
        }
        this.scrollContainerTicket.nativeElement.scrollBy({
            left: 200,
            behavior: 'smooth',
        });
        setTimeout(() => this.checkScrollPositionTicket(), 300);
    }

    scrollLeftMeet(): void {
        if (!this.scrollContainerMeet) {
            return;
        }
        this.scrollContainerMeet.nativeElement.scrollBy({
            left: -200,
            behavior: 'smooth',
        });
        setTimeout(() => this.checkScrollPositionMeet(), 300);
    }

    scrollRightMeet(): void {
        if (!this.scrollContainerMeet) {
            return;
        }
        this.scrollContainerMeet.nativeElement.scrollBy({
            left: 200,
            behavior: 'smooth',
        });
        setTimeout(() => this.checkScrollPositionMeet(), 300);
    }

    private checkScrollPosition(): void {
        const scrollLeft = this.scrollContainer.nativeElement.scrollLeft;
        const scrollWidth = this.scrollContainer.nativeElement.scrollWidth;
        const clientWidth = this.scrollContainer.nativeElement.clientWidth;

        this.isAtLeftEnd = scrollLeft === 0;
        this.isAtRightEnd = scrollLeft + clientWidth >= scrollWidth - 1;
        this.cdr.detectChanges();
    }

    private checkScrollPositionTicket(): void {
        const scrollLeft = this.scrollContainerTicket.nativeElement.scrollLeft;
        const scrollWidth = this.scrollContainerTicket.nativeElement.scrollWidth;
        const clientWidth = this.scrollContainerTicket.nativeElement.clientWidth;

        this.isAtLeftEndTicket = scrollLeft === 0;
        this.isAtRightEndTicket = scrollLeft + clientWidth >= scrollWidth - 1;
        this.cdr.detectChanges();
    }

    private checkScrollPositionMeet(): void {
        const scrollLeft = this.scrollContainerMeet.nativeElement.scrollLeft;
        const scrollWidth = this.scrollContainerMeet.nativeElement.scrollWidth;
        const clientWidth = this.scrollContainerMeet.nativeElement.clientWidth;

        this.isAtLeftEndMeet = scrollLeft === 0;
        this.isAtRightEndMeet = scrollLeft + clientWidth >= scrollWidth - 1;
        this.cdr.detectChanges();
    }
}
