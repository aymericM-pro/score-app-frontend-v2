import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FootballService } from '@app/services/football.service';
import { Team } from '@app/models/football.models';

@Component({
    selector: 'app-teams',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './teams.component.html',
})
export class TeamsComponent implements OnInit {
    teams = signal<Team[]>([]);
    leagueId = signal<string>('');
    leagueName = signal<string>('');

    constructor(
        private footballService: FootballService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            const leagueId = params['leagueId'];
            this.leagueId.set(leagueId);
            this.leagueName.set(this.getLeagueName(leagueId));
            const teams = this.footballService.getTeams();
            this.teams.set(teams);
        });
    }

    private getLeagueName(leagueId: string): string {
        const leagueNames: { [key: string]: string } = {
            'ligue-1': 'Ligue 1',
            'premier-league': 'Premier League',
            'la-liga': 'La Liga',
            'serie-a': 'Serie A',
            bundesliga: 'Bundesliga',
        };
        return leagueNames[leagueId] || leagueId;
    }
}
