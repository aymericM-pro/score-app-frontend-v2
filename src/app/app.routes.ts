import { Routes } from '@angular/router';

export enum AppRoutePath {
    HOME = '',
    LEAGUE = 'league/:id',
    PLAYERS = 'players',
    TEAMS = 'teams/:leagueId',
    TEAM_DETAIL = 'team/:leagueId/:teamId',
}

export const APP_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('@app/main-layout.component').then((m) => m.MainLayoutComponent),
        children: [
            // Home
            {
                path: '',
                loadComponent: () =>
                    import('@app/components/leagues/leagues.component').then(
                        (m) => m.LeaguesComponent
                    ),
            },

            // League + nested navigation
            {
                path: 'league/:id',
                loadComponent: () =>
                    import('@app/components/league-detail/league-detail.component').then(
                        (m) => m.LeagueDetailComponent
                    ),
                children: [
                    {
                        path: '',
                        redirectTo: 'standings',
                        pathMatch: 'full',
                    },
                    {
                        path: 'standings',
                        loadComponent: () =>
                            import('@app/components/standings/standings.component').then(
                                (m) => m.StandingsComponent
                            ),
                    },
                    {
                        path: 'calendar',
                        loadComponent: () =>
                            import('@app/components/calendar/calendar.component').then(
                                (m) => m.CalendarComponent
                            ),
                    },
                    {
                        path: 'teams',
                        loadComponent: () =>
                            import('@app/components/teams/teams.component').then(
                                (m) => m.TeamsComponent
                            ),
                    },
                ],
            },

            // Team detail
            {
                path: 'team/:leagueId/:teamId',
                loadComponent: () =>
                    import('@app/components/team-detail/team-detail.component').then(
                        (m) => m.TeamDetailComponent
                    ),
            },

            // Players (global page)
            {
                path: 'players',
                loadComponent: () =>
                    import('@app/components/players/players.component').then(
                        (m) => m.PlayersComponent
                    ),
            },
        ],
    },

    {
        path: '**',
        redirectTo: '',
    },
];
