import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-meet-card-poi',
    standalone: true,
    imports: [RouterLink, NgOptimizedImage, NgIf],
    templateUrl: './meet-card-poi.component.html',
    styleUrl: './meet-card-poi.component.css',
})
export class MeetCardPoiComponent {
    @Input() title?: string = '';
    @Input() image?: string;
    @Input() description?: string = '';
    @Input() infoPlus?: string = '';
    @Input() link?: string = '';

    isLoadingImage = true;
}
