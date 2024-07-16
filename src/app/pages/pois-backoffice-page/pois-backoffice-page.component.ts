import { Component, OnInit, ViewChild } from '@angular/core';
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
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';

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
    selectedId: number | null = null;

    errorSave: string | null = null;
    loadingSave: boolean = false;

    @ViewChild('fileUpload') fileUpload: any;

    poi = {
        name: null,
        description: null,
        cover: null as File | null,
        latitude: null,
        longitude: null,
        city: null as any,
        address: null,
        type: null as any,
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

    openSaveDialog(id?: number) {
        this.saveDialog = true;
        this.errorSave = null;
        this.selectedId = null;
        if (id) {
            const poi = this.pois.find((poi) => poi.id === id);
            this.selectedId = id;
            this.poi.name = poi.name;
            this.poi.description = poi.description;
            this.poi.cover = poi.cover;
            this.selectedImage = poi.cover.url;
        } else {
            this.poi = {
                name: null,
                description: null,
                cover: null,
                latitude: null,
                longitude: null,
                city: null,
                address: null,
                type: null,
            };
        }

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

    onUpload(event: FileSelectEvent) {
        this.selectedImage = URL.createObjectURL(event.files[0]);
        this.poi.cover = event.files[0];
    }

    clear() {
        this.poi.cover = null;
        this.fileUpload.clear();
    }

    async save() {
        this.errorSave = null;
        this.loadingSave = true;

        if (this.poi.cover instanceof File) {
            this.saveImage();
        } else {
            this.savePoi();
        }
    }

    saveImage() {
        this.poiService.storeCover(this.poi.cover!).subscribe({
            next: (data: any) => {
                this.savePoi(data);
            },
            error: (_) => {
                this.errorSave = "Une erreur est survenue lors de l'envoi de l'image";
                this.loadingSave = false;
            },
        });
    }

    savePoi(cover?: any) {
        if (this.selectedId) {
            this.poiService
                .updatePoi(this.selectedId.toString(), {
                    name: this.poi.name!,
                    description: this.poi.description!,
                    coverId: cover ? cover.id : undefined,
                })
                .subscribe({
                    next: (_) => {
                        this.loadingSave = false;
                        this.saveDialog = false;
                        this.searchPois();
                    },
                    error: (_) => {
                        this.errorSave = "Une erreur est survenue lors de l'envoi des données";
                        this.loadingSave = false;
                    },
                });
        } else {
            this.poiService
                .storePoi({
                    name: this.poi.name!,
                    description: this.poi.description!,
                    coverId: cover ? cover.id : undefined,
                    latitude: this.poi.latitude!,
                    longitude: this.poi.longitude!,
                    cityId: this.poi.city!.id!,
                    address: this.poi.address!,
                    typeId: this.poi.type!.id!,
                })
                .subscribe({
                    next: (_) => {
                        this.loadingSave = false;
                        this.saveDialog = false;
                        this.searchPois();
                    },
                    error: (_) => {
                        this.errorSave = "Une erreur est survenue lors de l'envoi des données";
                        this.loadingSave = false;
                    },
                });
        }
    }
}
