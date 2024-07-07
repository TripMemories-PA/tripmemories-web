import { Component, Input } from '@angular/core';
import { PoiModel } from '../../models/Poi.model';
import { CardModule } from 'primeng/card';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-monument-card',
    standalone: true,
    imports: [CardModule, NgOptimizedImage, RatingModule, SharedModule, FormsModule, NgIf],
    templateUrl: './monument-card.component.html',
    styleUrl: './monument-card.component.css',
})
export class MonumentCardComponent {
    constructor(private router: Router) {}
    @Input() city: string = '';
    @Input() monument: PoiModel = new PoiModel();

    @Input() value: number = 3;

    loadingImage: boolean = true;

    goToPoi() {
        this.router.navigate([`/poi/${this.monument.id}`]);
    }
}
