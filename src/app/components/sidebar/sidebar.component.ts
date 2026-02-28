import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@app/pipes/translate.pipe';

interface SidebarItem {
    label: string;
    icon: string;
    route: string;
}

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslatePipe],
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
    private route = inject(ActivatedRoute);

    get leagueId(): string | null {
        return this.route.firstChild?.snapshot.paramMap.get('id') ?? null;
    }

    items: SidebarItem[] = [
        { label: 'sidebar.standings', icon: 'mdi-trophy-outline', route: 'standings' },
        { label: 'sidebar.matches', icon: 'mdi-calendar-month-outline', route: 'calendar' },
        { label: 'sidebar.teams', icon: 'mdi-account-group-outline', route: 'teams' },
    ];
}
