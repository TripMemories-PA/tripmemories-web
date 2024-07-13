import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-backoffice-sidenav',
    standalone: true,
    imports: [SidebarModule, ButtonModule, ListboxModule, FormsModule],
    templateUrl: './backoffice-sidenav.component.html',
    styleUrl: './backoffice-sidenav.component.css',
})
export class BackofficeSidenavComponent {
    sidebarVisible = false;

    items = [
        {
            label: 'New',
            command: () => {
                console.log('new');
            },
        },
        {
            label: 'Search',
            command: () => {
                console.log('search');
            },
        },
    ];

    goTo() {
        console.log('goTo');
    }
}
