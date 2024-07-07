import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CityModel } from '../../models/city.model';

@Component({
    selector: 'app-city-card',
    standalone: true,
    imports: [CardModule, RatingModule, FormsModule, NgOptimizedImage, NgIf],
    templateUrl: './city-card.component.html',
    styleUrl: './city-card.component.css',
})
export class CityCardComponent {
    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {}

    @Input() city: string = '';
    @Input() cityModel: CityModel = new CityModel();

    value: number = 3;
    loadingImage: boolean = true;

    goToCity() {
        this.router.navigate([this.cityModel.id], { relativeTo: this._activatedRoute });
    }
}
