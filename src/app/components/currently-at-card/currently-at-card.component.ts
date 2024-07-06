import { Component, Input } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-currently-at-card',
    standalone: true,
    imports: [NgOptimizedImage, RouterLink, NgIf],
    templateUrl: './currently-at-card.component.html',
    styleUrl: './currently-at-card.component.css',
})
export class CurrentlyAtCardComponent {
    @Input() title?: string = '';
    @Input() image?: string;
    @Input() description?: string = '';
    @Input() infoPlus?: string = '';
    @Input() link?: string = '';

    isLoadingImage = true;
}
