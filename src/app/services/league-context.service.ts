import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LeagueContextService {
  leagueId   = signal<string>('');
  activeView = signal<'standings' | 'calendar'>('standings');
}
