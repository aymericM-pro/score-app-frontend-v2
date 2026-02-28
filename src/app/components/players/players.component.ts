import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootballService } from '@app/services/football.service';
import { PlayerStats } from '@app/models/football.models';

type StatType = 'goals' | 'assists' | 'cards';

@Component({
    selector: 'app-players',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './players.component.html',
})
export class PlayersComponent implements OnInit {
    playerStats = signal<PlayerStats[]>([]);
    statType = signal<StatType>('goals');
    displayedStats = signal<PlayerStats[]>([]);

    constructor(private footballService: FootballService) {}

    ngOnInit() {
        const stats = this.footballService.getPlayerStats();
        this.playerStats.set(stats);
        this.updateDisplayedStats();
    }

    setStatType(type: StatType) {
        this.statType.set(type);
        this.updateDisplayedStats();
    }

    getInitials(name: string): string {
        const parts = name.split(' ');
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }

    private updateDisplayedStats() {
        const stats = [...this.playerStats()];
        stats.sort((a, b) => b.goals - a.goals);
        this.displayedStats.set(stats);
    }
}
