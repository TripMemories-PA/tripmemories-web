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
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CityService } from '../../services/city/city.service';
import { FileUploadModule } from 'primeng/fileupload';

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
        FloatLabelModule,
        DropdownModule,
        InputTextareaModule,
        FileUploadModule,
    ],
    templateUrl: './pois-backoffice-page.component.html',
    styleUrl: './pois-backoffice-page.component.css',
})
export class PoisBackofficePageComponent implements OnInit {
    constructor(
        private poiService: PoisService,
        private cityService: CityService,
    ) {}

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
    saveDialog: boolean = false;
    searchCity: string = '';

    poi = {
        name: null,
        description: null,
        coverId: null,
        latitude: null,
        longitude: null,
        city: null,
        address: null,
        type: null,
    };

    cities: any[] = [];
    types: any = [];

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
    debouncedSearchCity = debounce(this.getCities, 500);

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

    openSaveDialog() {
        this.saveDialog = true;
        this.getTypes();
        this.getCities();
    }

    getTypes() {
        this.poiService.getTypes().subscribe((types) => {
            this.types = types;
        });
    }

    getCities() {
        this.cityService.getCities(undefined, undefined, this.searchCity).subscribe((cities) => {
            const data = cities.data.map((city) => {
                return {
                    ...city,
                    label: city.name + ' (' + city.zipCode + ')',
                };
            });
            this.cities = data;
        });
    }

    onUpload(event: any) {
        console.log(event);
    }
}
