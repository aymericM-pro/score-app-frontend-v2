import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FootballService } from '../../services/football.service';
import { Standing } from '../../models/football.models';

type StandingType = 'overall' | 'home' | 'away';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './standings.component.html',
})
export class StandingsComponent implements OnInit {
  standings = signal<Standing[]>([]);
  standingType = signal<StandingType>('overall');
  displayedStandings = signal<Standing[]>([]);

  constructor(private footballService: FootballService) {}

  ngOnInit() {
    const standings = this.footballService.getStandings();
    this.standings.set(standings);
    this.updateDisplayedStandings();
  }

  setStandingType(type: StandingType) {
    this.standingType.set(type);
    this.updateDisplayedStandings();
  }

  private updateDisplayedStandings() {
    const type = this.standingType();
    const standings = this.standings();

    if (type === 'overall') {
      this.displayedStandings.set(standings);
      return;
    }

    const filteredStandings = standings.map(s => {
      const stats = type === 'home' ? s.home : s.away;
      if (!stats) return s;

      return {
        ...s,
        played: stats.played,
        won: stats.won,
        drawn: stats.drawn,
        lost: stats.lost,
        goalsFor: stats.goalsFor,
        goalsAgainst: stats.goalsAgainst,
        goalDifference: stats.goalsFor - stats.goalsAgainst,
        points: stats.points
      };
    });

    const sorted = [...filteredStandings].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });

    sorted.forEach((s, i) => s.position = i + 1);
    this.displayedStandings.set(sorted);
  }
}
