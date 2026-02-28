import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@app/components/header/header.component';
import { SidebarComponent } from '@app/components/sidebar/sidebar.component';

@Component({
    standalone: true,
    selector: 'app-main-layout',
    imports: [RouterOutlet, HeaderComponent, SidebarComponent],
    template: `
        <app-header />

        <div class="flex">
            <app-sidebar />
            <main class="flex-1">
                <router-outlet />
            </main>
        </div>
    `,
})
export class MainLayoutComponent {}
