import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { NgIf } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { MeetRequest } from '../../models/request/meet.request';
import { PoisService } from '../../services/pois/pois.service';
import { PoiModel } from '../../models/Poi.model';
import { TicketModel } from '../../models/ticket.model';
import { CalendarModule } from 'primeng/calendar';
import { MeetService } from '../../services/meet/meet.service';
import { addDays, format } from 'date-fns';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';

@Component({
    selector: 'app-create-meet-card',
    standalone: true,
    imports: [
        ButtonModule,
        ChipsModule,
        DropdownModule,
        FileUploadModule,
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        MessageModule,
        NgIf,
        ProgressBarModule,
        RatingModule,
        CalendarModule,
        InputSwitchModule,
        AutoCompleteModule,
    ],
    templateUrl: './create-meet-card.component.html',
    styleUrl: './create-meet-card.component.css',
})
export class CreateMeetCardComponent implements OnInit {
    @Input() inputPoiId?: number;
    @Input() inputPoiName?: string;
    @Input() ticketsInput: TicketModel[] = [];

    @Output() meetCreated: EventEmitter<any> = new EventEmitter();

    meetCheck: boolean = false;
    reductionCheck: boolean = false;

    date?: Date;

    loading: boolean = false;
    success: string | null = null;
    error: string | null = null;

    loadingPoi: boolean = false;
    loadingTicket: boolean = false;
    poi: PoiModel[] = [];
    tickets: TicketModel[] = [];

    selectedPoi?: PoiModel;
    selectedTicket?: TicketModel;
    selectedSize?: { label: string; value: number };

    disableButtonReductionCheck: boolean = false;
    disableButtonMeetCheck: boolean = false;

    constructor(
        private poiService: PoisService,
        private meetService: MeetService,
    ) {}

    nbrPeopleOptions = Array.from({ length: 49 }, (_, i) => i + 2).map((i) => ({
        label: i.toString(),
        value: i,
    }));

    meetModel: MeetRequest = {
        title: '',
        description: '',
        date: undefined,
        size: 0,
        poiId: this.inputPoiId ?? -1,
        ticketId: null,
    };

    minDate = addDays(new Date(), 7);

    get valid(): boolean {
        if (this.meetCheck) {
            return (
                !!this.meetModel.title &&
                !!this.meetModel.description &&
                !!this.meetModel.date &&
                this.meetModel.poiId !== -1 &&
                !!this.meetModel.size
            );
        } else {
            return (
                !!this.meetModel.title &&
                !!this.meetModel.description &&
                !!this.meetModel.date &&
                this.meetModel.poiId !== -1 &&
                this.meetModel.ticketId !== null
            );
        }
    }

    getTickets(poiId: number): void {
        this.loadingTicket = true;
        this.poiService.getPoisTickets(poiId.toString()).subscribe({
            next: (response) => {
                this.loadingTicket = false;
                this.tickets = response.filter((ticket) => ticket.quantity > 0);
            },
            error: (error) => {
                this.loadingTicket = false;
                console.error(error);
            },
        });
    }

    updateDate() {
        if (this.date) {
            this.meetModel.date = format(this.date, 'yyyy-MM-dd HH:mm:ss');
        }
    }

    updateSize() {
        this.meetModel.size = this.selectedSize?.value ?? 0;
    }

    updatePoiId() {
        this.meetModel.poiId = this.selectedPoi?.id ?? -1;
        this.getTickets(this.meetModel.poiId);
    }

    updateTicketId() {
        this.meetModel.ticketId = this.selectedTicket?.id ?? 0;
    }

    onMeetCheckChange() {
        if (this.meetCheck) {
            this.reductionCheck = false;
            this.disableButtonMeetCheck = false;
            this.disableButtonReductionCheck = true;
        } else {
            this.disableButtonMeetCheck = true;
        }
    }

    onReductionCheckChange() {
        if (this.reductionCheck) {
            this.meetCheck = false;
            this.disableButtonReductionCheck = false;
            this.disableButtonMeetCheck = true;
        } else {
            this.disableButtonReductionCheck = true;
        }
    }

    submitMeet() {
        this.loading = true;
        this.meetService.createMeet(this.meetModel).subscribe({
            next: (_) => {
                this.success = 'Meet créé avec succès';
                this.loading = false;
                setTimeout(() => {
                    this.meetCreated.emit();
                }, 5000);
            },
            error: (error) => {
                this.error = 'Erreur lors de la création du meet';
                this.loading = false;
                console.error(error);
            },
        });
    }

    searchPoi(event: AutoCompleteCompleteEvent) {
        this.loadingPoi = true;
        if (event.query === '') {
            this.poiService.getPOIs('1', '20').subscribe({
                next: (response) => {
                    this.loadingPoi = false;
                    this.poi = response.data;
                },
                error: (error) => {
                    this.loadingPoi = false;
                    console.error(error);
                },
            });
            return;
        }
        this.poiService.getPOIs('1', '10', undefined, undefined, undefined, event.query).subscribe({
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

    ngOnInit(): void {
        this.loadingPoi = true;
        if (this.inputPoiId && this.inputPoiName) {
            this.loadingPoi = false;
            if (this.ticketsInput.length > 0) {
                this.tickets = this.ticketsInput.filter(
                    (ticket) => ticket.groupSize > 1 && ticket.groupSize <= 50,
                );
            }
            this.meetModel.poiId = this.inputPoiId;
            return;
        }
        this.poiService.getPOIs('1', '20').subscribe({
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
