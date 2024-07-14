import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PoisService } from '../../services/pois/pois.service';
import { ICreatePoi } from '../../models/interface/ICreatePoi';
import { PoiModel } from '../../models/Poi.model';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { NgIf } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
    selector: 'app-update-poi',
    standalone: true,
    imports: [
        ButtonModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        MessageModule,
        NgIf,
        ProgressBarModule,
        InputTextareaModule,
    ],
    templateUrl: './update-poi.component.html',
    styleUrl: './update-poi.component.css',
})
export class UpdatePoiComponent implements OnInit {
    constructor(private poiService: PoisService) {}

    @Input() poiId: number = -1;
    @Input() poi: PoiModel = new PoiModel();
    @Output() closeModal: EventEmitter<any> = new EventEmitter();

    loading = false;
    success = '';
    error = '';

    updatePoiRequest: ICreatePoi = {
        name: '',
        description: '',
    };

    ngOnInit(): void {
        if (this.poi) {
            this.updatePoiRequest = {
                name: this.poi.name as string,
                description: this.poi.description as string,
            };
        }
    }

    get valid() {
        return this.updatePoiRequest.name && this.updatePoiRequest.description;
    }

    updatePoi() {
        if (!this.valid || this.poiId === -1) {
            return;
        }
        this.poiService.updatePoi(this.poiId.toString(), this.updatePoiRequest).subscribe({
            next: (response) => {
                this.success = 'Le point a été mis à jour avec succès';
                setTimeout(() => {
                    this.closeModal.emit();
                }, 3000);
            },
            error: (error) => {
                console.error(error);
                this.error = "Une erreur s'est produite lors de la mise à jour du point";
            },
        });
    }
}
