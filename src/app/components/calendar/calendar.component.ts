import { Component, OnInit, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@app/pipes/translate.pipe';
import { DateTime } from 'luxon';
import { FootballService } from '@app/services/football.service';
import { LanguageService } from '@app/services/language.service';
import { Match } from '@app/models/football.models';
import { ButtonComponent } from '@app/components/desing-system/button/fsButton.component';
import { DropdownComponent, DropdownItem } from '@app/components/desing-system/dropdown/fsDropdown.component';

interface MatchGroup {
  date: string;
  dayName: string;
  fullDate: string;
  matches: Match[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ButtonComponent, DropdownComponent],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {
  private footballService = inject(FootballService);
  private languageService = inject(LanguageService);

  matches = signal<Match[]>([]);
  matchdays = signal<number[]>([]);
  selectedMatchday = signal<number>(1);
  filteredMatches = signal<Match[]>([]);
  groupedMatches = signal<MatchGroup[]>([]);

  matchdayItems = computed<DropdownItem[]>(() =>
    this.matchdays().map(d => ({ value: d, label: `Journée ${d}` }))
  );

  selectedMatchdayItem = computed<DropdownItem | null>(() => {
    const day = this.selectedMatchday();
    return day != null ? { value: day, label: `Journée ${day}` } : null;
  });

  constructor() {
    effect(() => {
      const _lang = this.languageService.currentLanguage();
      this.groupMatchesByDate(this.filteredMatches());
    });
  }

  ngOnInit() {
    const allMatches = this.footballService.getMatches();
    this.matches.set(allMatches);

    const uniqueMatchdays = [...new Set(allMatches.map(m => m.matchday))].sort((a, b) => a - b);
    this.matchdays.set(uniqueMatchdays);

    if (uniqueMatchdays.length > 0) {
      const d = uniqueMatchdays[0];
      this.selectMatchday({ value: d, label: `Journée ${d}` });
    }
  }

  selectMatchday(item: DropdownItem) {
    const day = Number(item.value);
    this.selectedMatchday.set(day);
    const filtered = this.footballService.getMatchesByMatchday(day);
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

    const locale = this.languageService.currentLanguage();

    const groupedArray: MatchGroup[] = Array.from(groups.entries()).map(([date, matchList]) => {
      const dt = DateTime.fromISO(date).setLocale(locale);
      return {
        date,
        dayName: dt.toFormat('cccc'),
        fullDate: dt.toFormat('d MMMM'),
        matches: matchList.sort((a, b) => a.time.localeCompare(b.time))
      };
    });

    this.groupedMatches.set(groupedArray);
  }

  nextMatchday() {
    const currentIndex = this.matchdays().indexOf(this.selectedMatchday());
    if (currentIndex < this.matchdays().length - 1) {
      const d = this.matchdays()[currentIndex + 1];
      this.selectMatchday({ value: d, label: `Journée ${d}` });
    }
  }

  previousMatchday() {
    const currentIndex = this.matchdays().indexOf(this.selectedMatchday());
    if (currentIndex > 0) {
      const d = this.matchdays()[currentIndex - 1];
      this.selectMatchday({ value: d, label: `Journée ${d}` });
    }
  }
}
