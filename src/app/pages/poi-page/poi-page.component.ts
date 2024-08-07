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
import { MyMissionCardComponent } from '../../components/my-mission-card/my-mission-card.component';
import { QuestModel } from '../../models/quest.model';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, combineLatest, finalize, from, of } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

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
        MyMissionCardComponent,
        ProgressSpinnerModule,
        LoadingSpinnerComponent,
    ],
    templateUrl: './poi-page.component.html',
    styleUrl: './poi-page.component.css',
})
export class PoiPageComponent implements OnInit {
    @ViewChild('scrollContainer') scrollContainer!: ElementRef;
    @ViewChild('containerTicket') scrollContainerTicket!: ElementRef;
    @ViewChild('scrollContainerMeet') scrollContainerMeet!: ElementRef;
    @ViewChild('scrollContainerQuest') scrollContainerQuest!: ElementRef;

    @ViewChild('leftButton', { static: true }) leftButton!: ElementRef;
    @ViewChild('rightButton', { static: true }) rightButton!: ElementRef;

    @ViewChild('leftButtonTicket', { static: true }) leftButtonTicket!: ElementRef;
    @ViewChild('rightButtonTicket', { static: true }) rightButtonTicket!: ElementRef;

    @ViewChild('leftButtonMeet', { static: true }) leftButtonMeet!: ElementRef;
    @ViewChild('rightButtonMeet', { static: true }) rightButtonMeet!: ElementRef;

    poi: PoiModel = new PoiModel();
    poiPosts: PostModel[] = [];
    poiNear: PoiModel[] = [];
    tickets: TicketModel[] = [];
    meets: MeetModel[] = [];
    quests: QuestModel[] = [];

    widthImage: number = 1;
    heightImage: number = 1;
    showDialog: boolean = false;
    showDialogQuiz: boolean = false;
    showDialogMeet: boolean = false;
    nbrQuestions: number = 0;

    nbrPagePoiPost: number = 1;
    nbrPagePoiMeet: number = 1;
    nbrPagePoiNear: number = 1;
    nbrPagePoiQuest: number = 1;

    isAtLeftEnd: boolean = true;
    isAtRightEnd: boolean = false;

    isAtLeftEndTicket: boolean = true;
    isAtRightEndTicket: boolean = false;

    isAtLeftEndMeet: boolean = true;
    isAtRightEndMeet: boolean = false;

    idPoi: string = '';

    generalLoading: boolean = true;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private router: Router,
        private poisService: PoisService,
        private imageService: ImageServiceService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef,
    ) {}
    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params) => {
            const param = params.get('id');
            if (!param) {
                this.generalLoading = false;
                return;
            }
            this.idPoi = param;
            this.loadData(param);
        });
    }

    private loadData(id: string) {
        const details$ = this.getPoiDetails(id);
        const tickets$ = this.getPoiTickets(id);
        const posts$ = this.getPoiPosts(id);
        const meets$ = this.getPoiMeet(id);
        const quests$ = this.getPoiQuests(id);

        const sources = from([details$, tickets$, posts$, meets$, quests$]);

        combineLatest([sources])
            .pipe(
                finalize(() => {
                    setTimeout(() => {
                        this.generalLoading = false;
                        this.initScrollEvent();
                    }, 2000);
                }),
                catchError((error) => {
                    console.error('Error loading data', error);
                    this.generalLoading = false;
                    return of([]);
                }),
            )
            .subscribe();
    }

    private initScrollEvent() {
        setTimeout(() => {
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
        }, 500);
    }

    get isSameId(): boolean {
        return this.authService.user?.poiId?.toString() === this.idPoi;
    }

    get isConnect(): boolean {
        return this.authService.user?.access_token !== undefined;
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

    getPoiPosts(id: string | null, page: number = 1): void {
        if (!id) {
            return;
        }
        this.poisService.getPoiPosts(id, '10', page.toString()).subscribe({
            next: (response) => {
                this.nbrPagePoiPost += 1;
                this.poiPosts = this.poiPosts.concat(response.data);
            },
            error: (error) => {
                console.error(error);
            },
        });
    }

    reloadPosts() {
        if (!this.idPoi) {
            return;
        }
        this.showDialog = false;
        this.nbrPagePoiPost = 1;
        this.getPoiPosts(this.idPoi, this.nbrPagePoiPost);
    }

    getPoiQuests(id: string | null, page: number = 1): void {
        if (!id) {
            return;
        }
        this.poisService
            .getPoiQuests(
                id,
                page.toString(),
                '12',
                this.authService.user?.access_token !== undefined,
            )
            .subscribe({
                next: (response) => {
                    this.quests = this.quests.concat(response.data);
                    this.nbrPagePoiQuest += 1;
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

    getPoiMeet(id: string | null, page: number = 1): void {
        if (!id) {
            return;
        }
        this.poisService.getPoiMeets(id, page.toString(), '10').subscribe({
            next: (response) => {
                this.nbrPagePoiMeet += 1;
                this.meets = this.meets.concat(response.data);
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

    getPoiNear(page: number = 1): void {
        this.poisService
            .getPOIs(page.toString(), '10', this.poi.latitude, this.poi.longitude, '10')
            .subscribe({
                next: (response) => {
                    this.nbrPagePoiNear += 1;
                    this.poiNear = this.poiNear.concat(
                        response.data.filter(
                            (poi) =>
                                poi.id !== this.poi.id &&
                                poi.name?.toLowerCase() !== this.poi.name?.toLowerCase(),
                        ),
                    );
                    const seenNames = new Set<string>();
                    this.poiNear = this.poiNear.filter((poi) => {
                        const lowerCaseName = poi.name?.toLowerCase();
                        if (lowerCaseName && !seenNames.has(lowerCaseName)) {
                            seenNames.add(lowerCaseName);
                            return true;
                        }
                        return false;
                    });
                },
                error: (error) => {
                    console.error(error);
                },
            });
    }

    scrollPoiPost(event: Event) {
        const element = event.target as HTMLElement;
        const isScrolledToRight = element.scrollWidth - element.scrollLeft === element.clientWidth;

        if (isScrolledToRight) {
            this.getPoiPosts(this.idPoi, this.nbrPagePoiPost);
        }
    }

    scrollPoiMeet(event: Event) {
        const element = event.target as HTMLElement;
        const isScrolledToRight = element.scrollWidth - element.scrollLeft === element.clientWidth;

        if (isScrolledToRight) {
            this.getPoiMeet(this.idPoi, this.nbrPagePoiMeet);
        }
    }

    scrollPoiNear(event: Event) {
        const element = event.target as HTMLElement;
        const isScrolledToRight = element.scrollWidth - element.scrollLeft === element.clientWidth;

        if (isScrolledToRight) {
            this.getPoiNear(this.nbrPagePoiNear);
        }
    }

    scrollPoiQuest(event: Event) {
        const element = event.target as HTMLElement;
        const isScrolledToRight = element.scrollWidth - element.scrollLeft === element.clientWidth;

        if (isScrolledToRight) {
            this.getPoiQuests(this.idPoi, this.nbrPagePoiNear);
        }
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
