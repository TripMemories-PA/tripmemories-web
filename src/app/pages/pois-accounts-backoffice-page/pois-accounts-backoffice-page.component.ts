import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { debounce } from 'lodash';
import { UserTypes } from '../../models/enum/UserTypes';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';
import { PoisService } from '../../services/pois/pois.service';

@Component({
    selector: 'app-pois-accounts-backoffice-page',
    standalone: true,
    imports: [
        TableModule,
        CommonModule,
        InputTextModule,
        FormsModule,
        ButtonModule,
        DialogModule,
        ChartModule,
    ],
    templateUrl: './pois-accounts-backoffice-page.component.html',
    styleUrl: './pois-accounts-backoffice-page.component.css',
})
export class PoisAccountsBackofficePageComponent implements OnInit {
    constructor(
        private userService: UsersService,
        private poiService: PoisService,
    ) {}

    users: any[] = [];
    itemsPerPage: number = 10;
    currentPage: number = 1;
    totalPages: number = 0;
    search: string = '';
    loading: boolean = false;

    profitDialog: boolean = false;

    data = {
        labels: [] as string[],
        datasets: [
            {
                label: 'Entrées unitaires vendues',
                data: [] as number[],
            },
            {
                label: 'Revenue',
                data: [] as number[],
            },
        ],
    };

    ngOnInit(): void {
        this.searchUsers();
    }

    searchUsers() {
        this.loading = true;
        this.userService
            .search(this.search, this.itemsPerPage, this.currentPage, UserTypes.POI)
            .subscribe((users) => {
                this.users = users.data;
                this.totalPages = users.meta.total;
                this.loading = false;
            });
    }

    debouncedSearch = debounce(this.searchUsers, 500);

    onPageChange(event: any) {
        if (event.first === 0) {
            this.currentPage = 1;
            this.itemsPerPage = event.rows;
        } else {
            this.itemsPerPage = event.rows;
            this.currentPage = event.first / this.itemsPerPage + 1;
        }

        this.searchUsers();
    }

    openProfitDialog(id: number) {
        this.poiService.getPoiSales(id.toString()).subscribe((sales) => {
            this.data.labels = Object.keys(sales);
            this.data.datasets[0].data = Object.values(sales).map((sale) => sale.tickets);
            this.data.datasets[1].data = Object.values(sales).map((sale) => sale.revenue);
            this.profitDialog = true;
        });
    }
}
