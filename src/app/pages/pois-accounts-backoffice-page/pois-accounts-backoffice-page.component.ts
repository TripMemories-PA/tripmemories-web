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
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { format } from 'date-fns';

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
        CalendarModule,
        PasswordModule,
        FloatLabelModule,
        DropdownModule,
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
    pois: any[] = [];
    searchPois: string = '';
    itemsPerPage: number = 10;
    currentPage: number = 1;
    totalPages: number = 0;
    search: string = '';
    loading: boolean = false;
    loadingSave: boolean = false;
    loadingUpdate: boolean = false;

    profitDialog: boolean = false;
    repaymentDialog: boolean = false;
    selectedId: number | null = null;
    saveDialog: boolean = false;
    errorSave: string | null = null;

    repayment = {
        startDate: null,
        endDate: null,
        amount: null as string | null,
    };

    user = {
        email: null as string | null,
        password: null as string | null,
        confirmPassword: null as string | null,
        poi: null as any | null,
    };

    maxDate = new Date();
    loadingRepayment: boolean = false;

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
    debouncedSearchPois = debounce(this.getPois, 500);

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

    openRepaymentDialog(id: number) {
        this.selectedId = id;
        this.repayment.startDate = null;
        this.repayment.endDate = null;
        this.repayment.amount = null;
        this.repaymentDialog = true;
        this.loadingRepayment = false;
    }

    calculateRepayment() {
        this.loadingRepayment = true;
        const startDate = format(this.repayment.startDate!, 'yyyy/MM/dd');
        const endDate = format(this.repayment.endDate!, 'yyyy/MM/dd');
        this.poiService
            .getPoiSales(this.selectedId!.toString(), startDate, endDate)
            .subscribe((sales) => {
                const total = Object.values(sales).reduce((acc, sale) => acc + sale.revenue, 0);

                this.repayment.amount = (total - total * 0.2).toFixed(2);
                this.loadingRepayment = false;
            });
    }

    openSaveDialog(id?: number) {
        this.getPois();
        this.selectedId = null;
        this.errorSave = null;
        if (id) {
            this.selectedId = id;
            const user = this.users.find((user) => user.id === id);
            this.user.email = user.email;
        } else {
            this.user.email = null;
        }
        this.user.password = null;
        this.user.confirmPassword = null;
        this.user.poi = null;
        this.saveDialog = true;
    }

    getPois() {
        this.poiService
            .getPOIs(undefined, undefined, undefined, undefined, undefined, this.searchPois)
            .subscribe((pois) => {
                this.pois = pois.data;
            });
    }

    save() {
        this.errorSave = null;
        if (!this.selectedId) {
            if (!this.checkPassword()) {
                return;
            }
        }

        if (this.selectedId) {
            this.loadingUpdate = true;
            this.userService.update(this.selectedId, this.user.email!).subscribe({
                next: () => {
                    this.loadingUpdate = false;
                    this.saveDialog = false;
                    this.searchUsers();
                },
                error: () => {
                    this.loadingUpdate = false;
                    this.errorSave = 'Une erreur est survenue';
                },
            });
            return;
        }

        this.loadingSave = true;
        this.userService
            .create({
                email: this.user.email!,
                password: this.user.password!,
                poiId: this.user.poi!.id!,
            })
            .subscribe({
                next: () => {
                    this.loadingSave = false;
                    this.saveDialog = false;
                    this.searchUsers();
                },
                error: () => {
                    this.loadingSave = false;
                    this.errorSave = 'Une erreur est survenue';
                },
            });
    }

    checkPassword() {
        if (this.user.password !== this.user.confirmPassword) {
            this.errorSave = 'Les mots de passe ne correspondent pas';
            return false;
        }

        if (
            !RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/).exec(
                this.user.password!,
            ) ||
            this.user.password!.length < 8 ||
            this.user.password!.length > 32
        ) {
            this.errorSave =
                'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial';
            return false;
        }

        return true;
    }

    savePassword() {
        this.errorSave = null;
        if (!this.checkPassword()) {
            return;
        }

        this.loadingSave = true;
        this.userService.updatePassword(this.selectedId!, this.user.password!).subscribe({
            next: () => {
                this.loadingSave = false;
                this.saveDialog = false;
                this.searchUsers();
            },
            error: () => {
                this.loadingSave = false;
                this.errorSave = 'Une erreur est survenue';
            },
        });
    }
}
