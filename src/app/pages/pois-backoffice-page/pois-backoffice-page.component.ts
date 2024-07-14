import { Component, OnInit } from '@angular/core';
import { debounce } from 'lodash';
import { PoisService } from '../../services/pois/pois.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';

@Component({
    selector: 'app-pois-backoffice-page',
    standalone: true,
    imports: [
        TableModule,
        CommonModule,
        InputTextModule,
        FormsModule,
        ButtonModule,
        DialogModule,
        ImageModule,
    ],
    templateUrl: './pois-backoffice-page.component.html',
    styleUrl: './pois-backoffice-page.component.css',
})
export class PoisBackofficePageComponent implements OnInit {
    constructor(private poiService: PoisService) {}

    pois: any[] = [];
    itemsPerPage: number = 10;
    currentPage: number = 1;
    totalPages: number = 0;
    search: string = '';
    loading: boolean = false;
    dialogImage: boolean = false;
    selectedImage: string = '';
    dialogDescription: boolean = false;
    selectedDescription: string = '';

    ngOnInit(): void {
        this.searchPois();
    }

    searchPois() {
        this.loading = true;
        this.poiService
            .getPOIs(
                this.currentPage.toString(),
                this.itemsPerPage.toString(),
                undefined,
                undefined,
                undefined,
                this.search,
            )
            .subscribe((pois) => {
                this.pois = pois.data;
                this.totalPages = pois.meta.total;
                this.loading = false;
            });
    }

    debouncedSearch = debounce(this.searchPois, 500);

    onPageChange(event: any) {
        if (event.first === 0) {
            this.currentPage = 1;
            this.itemsPerPage = event.rows;
        } else {
            this.itemsPerPage = event.rows;
            this.currentPage = event.first / this.itemsPerPage + 1;
        }

        this.searchPois();
    }

    openImageDialog(image: string) {
        this.selectedImage = image;
        this.dialogImage = true;
    }

    openDescriptionDialog(description: string) {
        this.selectedDescription = description;
        this.dialogDescription = true;
    }
}
