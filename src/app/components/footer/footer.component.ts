import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [NgOptimizedImage],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
})
export class FooterComponent {
    fullYear: number = new Date().getFullYear();

    navigateTo(route: string) {
        window.open(route, '_blank');
    }
}
