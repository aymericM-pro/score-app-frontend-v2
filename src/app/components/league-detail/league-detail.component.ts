import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { StandingsComponent } from '@app/components/standings/standings.component';
import { CalendarComponent } from '@app/components/calendar/calendar.component';
import { LeagueContextService } from '@app/services/league-context.service';

@Component({
  selector: 'app-league-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    StandingsComponent,
    CalendarComponent
  ],
  templateUrl: './league-detail.component.html',
})
export class LeagueDetailComponent implements OnInit {
  ctx = inject(LeagueContextService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ctx.leagueId.set(params['id']);
    });
  }
}
