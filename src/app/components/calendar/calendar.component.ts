import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FootballService } from '@app/services/football.service';
import { Match } from '@app/models/football.models';
import { ButtonComponent } from '@app/components/desing-system/button/fsButton.component';

interface MatchGroup {
  date: string;
  dayName: string;
  fullDate: string;
  matches: Match[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonComponent],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {
  matches = signal<Match[]>([]);
  matchdays = signal<number[]>([]);
  selectedMatchday = signal<number>(1);
  filteredMatches = signal<Match[]>([]);
  groupedMatches = signal<MatchGroup[]>([]);
  showDropdown = signal<boolean>(false);

  constructor(
    private footballService: FootballService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    const allMatches = this.footballService.getMatches();
    this.matches.set(allMatches);

    const uniqueMatchdays = [...new Set(allMatches.map(m => m.matchday))].sort((a, b) => a - b);
    this.matchdays.set(uniqueMatchdays);

    if (uniqueMatchdays.length > 0) {
      this.selectMatchday(uniqueMatchdays[0]);
    }
  }

  selectMatchday(matchday: number) {
    this.selectedMatchday.set(matchday);
    const filtered = this.footballService.getMatchesByMatchday(matchday);
    this.filteredMatches.set(filtered);
    this.groupMatchesByDate(filtered);
  }

  groupMatchesByDate(matches: Match[]) {
    const groups = new Map<string, Match[]>();

    matches.forEach(match => {
      if (!groups.has(match.date)) {
        groups.set(match.date, []);
      }
      groups.get(match.date)!.push(match);
    });

    const groupedArray: MatchGroup[] = Array.from(groups.entries()).map(([date, matchList]) => {
      const dayName = this.getDayName(date);
      const fullDate = this.getFormattedDate(date);
      return {
        date,
        dayName,
        fullDate,
        matches: matchList.sort((a, b) => a.time.localeCompare(b.time))
      };
    });

    this.groupedMatches.set(groupedArray);
  }

  nextMatchday() {
    const currentIndex = this.matchdays().indexOf(this.selectedMatchday());
    if (currentIndex < this.matchdays().length - 1) {
      this.selectMatchday(this.matchdays()[currentIndex + 1]);
    }
  }

  previousMatchday() {
    const currentIndex = this.matchdays().indexOf(this.selectedMatchday());
    if (currentIndex > 0) {
      this.selectMatchday(this.matchdays()[currentIndex - 1]);
    }
  }

  toggleDropdown() {
    this.showDropdown.set(!this.showDropdown());
  }

  selectMatchdayAndClose(matchday: number) {
    this.selectMatchday(matchday);
    this.showDropdown.set(false);
  }

  getDayName(dateString: string): string {
    const date = new Date(dateString);
    const days = this.translate.currentLang === 'fr'
      ? ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
      : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const months = this.translate.currentLang === 'fr'
      ? ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
      : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${day} ${months[date.getMonth()]}`;
  }
}
