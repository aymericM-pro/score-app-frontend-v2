import { Component, Injectable } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LeaguesComponent } from '@app/components/leagues/leagues.component';
import { LeagueDetailComponent } from '@app/components/league-detail/league-detail.component';
import { PlayersComponent } from '@app/components/players/players.component';
import { TeamsComponent } from '@app/components/teams/teams.component';
import { TeamDetailComponent } from '@app/components/team-detail/team-detail.component';
import { translations } from '@app/i18n/translations';

@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations[lang as keyof typeof translations] || translations.fr);
  }
}

export function TranslateLoaderFactory() {
  return new CustomTranslateLoader();
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class App {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
  }
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: LeaguesComponent },
      { path: 'league/:id', component: LeagueDetailComponent },
      { path: 'players', component: PlayersComponent },
      { path: 'teams/:leagueId', component: TeamsComponent },
      { path: 'team/:leagueId/:teamId', component: TeamDetailComponent }
    ]),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: TranslateLoaderFactory
        }
      })
    )
  ]
});
