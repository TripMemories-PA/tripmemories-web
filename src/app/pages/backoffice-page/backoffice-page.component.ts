import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UsersService } from '../../services/users/users.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { debounce } from 'lodash';

@Component({
    selector: 'app-backoffice-page',
    standalone: true,
    imports: [
        TableModule,
        AvatarModule,
        AvatarGroupModule,
        CommonModule,
        InputTextModule,
        FormsModule,
    ],
    templateUrl: './backoffice-page.component.html',
    styleUrl: './backoffice-page.component.css',
})
export class BackofficePageComponent implements OnInit {
    constructor(private userService: UsersService) {}

    users: any[] = [];
    itemsPerPage: number = 10;
    currentPage: number = 1;
    totalPages: number = 0;
    search: string = '';
    loading: boolean = false;
    ngOnInit(): void {
        this.searchUsers();
    }

    searchUsers() {
        this.loading = true;
        this.userService
            .search(this.search, this.itemsPerPage, this.currentPage)
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

    goToStripe(id: string) {
        window.open(`https://dashboard.stripe.com/test/customers/${id}`, '_blank');
    }
}
