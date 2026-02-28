import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FootballService } from '@app/services/football.service';
import { Team, PlayerStats, Match, Standing } from '@app/models/football.models';

type TabType = 'overview' | 'matches' | 'players';

interface MatchesByCompetition {
    competition: string;
    matches: Match[];
}

@Component({
    selector: 'app-team-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './team-detail.component.html',
})
export class TeamDetailComponent implements OnInit {
    team = signal<Team | null>(null);
    leagueId = signal<string>('');
    standing = signal<Standing | null>(null);
    allPlayers = signal<PlayerStats[]>([]);
    matchesByCompetition = signal<MatchesByCompetition[]>([]);
    activeTab = signal<TabType>('overview');

    constructor(
        private footballService: FootballService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            const leagueId = params['leagueId'];
            const teamId = parseInt(params['teamId']);
            this.leagueId.set(leagueId);

            const teams = this.footballService.getTeams();
            const team = teams.find((t) => t.id === teamId);
            this.team.set(team || null);

            if (team) {
                const standings = this.footballService.getStandings();
                const standing = standings.find((s) => s.team.id === teamId);
                this.standing.set(standing || null);

                const allPlayerStats = this.footballService.getPlayerStats();
                const teamPlayerStats = allPlayerStats
                    .filter((ps) => ps.player.team.id === teamId)
                    .sort((a, b) => b.goals + b.assists - (a.goals + a.assists));
                this.allPlayers.set(teamPlayerStats);

                const allMatches = this.footballService.getMatches();
                const teamMatches = allMatches.filter(
                    (m) => m.homeTeam.id === teamId || m.awayTeam.id === teamId
                );

                const competitions = [
                    'Ligue 1',
                    'Coupe de France',
                    'Ligue des Champions',
                    'Europa League',
                ];
                const grouped: MatchesByCompetition[] = competitions
                    .map((comp) => {
                        const compMatches = teamMatches.filter(() => Math.random() > 0.3);
                        return {
                            competition: comp,
                            matches: compMatches,
                        };
                    })
                    .filter((g) => g.matches.length > 0);

                this.matchesByCompetition.set(grouped);
            }
        });
    }

    setActiveTab(tab: TabType) {
        this.activeTab.set(tab);
    }

    calculateWinRate(): number {
        const standing = this.standing();
        if (!standing || standing.played === 0) return 0;
        return Math.round((standing.won / standing.played) * 100);
    }

    getMatchResult(match: Match): 'V' | 'N' | 'D' {
        const team = this.team();
        if (!team) return 'N';

        const isHome = match.homeTeam.id === team.id;
        const teamScore = isHome ? match.homeScore! : match.awayScore!;
        const opponentScore = isHome ? match.awayScore! : match.homeScore!;

        if (teamScore > opponentScore) return 'V';
        if (teamScore === opponentScore) return 'N';
        return 'D';
    }
}
