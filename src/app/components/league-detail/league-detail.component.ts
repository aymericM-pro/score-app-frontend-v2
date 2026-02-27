import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { StandingsComponent } from '../standings/standings.component';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-league-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    HeaderComponent,
    SidebarComponent,
    StandingsComponent,
    CalendarComponent
  ],
  templateUrl: './league-detail.component.html',
})
export class LeagueDetailComponent implements OnInit {
  activeView = signal<'standings' | 'calendar'>('standings');
  leagueId = signal<string>('');

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leagueId.set(params['id']);
    });
  }
}
