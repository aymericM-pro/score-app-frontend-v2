import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@app/pipes/translate.pipe';
import { League } from '@app/models/football.models';

interface LeagueGroup {
  title: string;
  leagues: League[];
  collapsed?: boolean;
}

@Component({
  selector: 'app-leagues',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './leagues.component.html',
})
export class LeaguesComponent {
  private allLeagues: League[] = [
    { id: 'premier-league', name: 'Premier League', country: 'England', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'linear-gradient(135deg, #37003c 0%, #04f5ff 100%)' },
    { id: 'la-liga', name: 'La Liga', country: 'Spain', logo: '🇪🇸', color: 'linear-gradient(135deg, #C8102E 0%, #FFD700 100%)' },
    { id: 'serie-a', name: 'Serie A', country: 'Italy', logo: '🇮🇹', color: 'linear-gradient(135deg, #006bb6 0%, #009246 100%)' },
    { id: 'bundesliga', name: 'Bundesliga', country: 'Germany', logo: '🇩🇪', color: 'linear-gradient(135deg, #000000 0%, #D3010C 100%)' },
    { id: 'ligue-1', name: 'Ligue 1', country: 'France', logo: '🇫🇷', color: 'linear-gradient(135deg, #002654 0%, #ED2939 100%)' },
    { id: 'champions-league', name: 'Champions League', country: 'Europe', logo: '⭐', color: 'linear-gradient(135deg, #001C58 0%, #00AEEF 100%)' },
    { id: 'europa-league', name: 'Europa League', country: 'Europe', logo: '🏆', color: 'linear-gradient(135deg, #FF6600 0%, #FFB800 100%)' },
    { id: 'conference-league', name: 'Conference League', country: 'Europe', logo: '🏅', color: 'linear-gradient(135deg, #00B140 0%, #00D664 100%)' },
    { id: 'premier-league-2', name: 'Premier League 2', country: 'England', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)' },
    { id: 'championship', name: 'Championship', country: 'England', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'linear-gradient(135deg, #334155 0%, #64748b 100%)' },
    { id: 'ligue-2', name: 'Ligue 2', country: 'France', logo: '🇫🇷', color: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' },
    { id: 'serie-b', name: 'Serie B', country: 'Italy', logo: '🇮🇹', color: 'linear-gradient(135deg, #0f4c75 0%, #3282b8 100%)' },
    { id: 'segunda-division', name: 'Segunda División', country: 'Spain', logo: '🇪🇸', color: 'linear-gradient(135deg, #831010 0%, #c71585 100%)' },
    { id: 'segunda-b', name: 'Primera RFEF', country: 'Spain', logo: '🇪🇸', color: 'linear-gradient(135deg, #4a1a1a 0%, #8b4513 100%)' },
    { id: '2-bundesliga', name: '2. Bundesliga', country: 'Germany', logo: '🇩🇪', color: 'linear-gradient(135deg, #1a1a1a 0%, #b91c1c 100%)' },
    { id: 'eredivisie', name: 'Eredivisie', country: 'Netherlands', logo: '🇳🇱', color: 'linear-gradient(135deg, #FF6600 0%, #FF9933 100%)' },
    { id: 'primeira-liga', name: 'Primeira Liga', country: 'Portugal', logo: '🇵🇹', color: 'linear-gradient(135deg, #006600 0%, #FF0000 100%)' },
    { id: 'super-lig', name: 'Süper Lig', country: 'Turkey', logo: '🇹🇷', color: 'linear-gradient(135deg, #E30A17 0%, #FFFFFF 100%)' },
    { id: 'jupiler-pro', name: 'Jupiler Pro League', country: 'Belgium', logo: '🇧🇪', color: 'linear-gradient(135deg, #000000 0%, #FFD100 100%)' },
    { id: 'scottish-prem', name: 'Scottish Premiership', country: 'Scotland', logo: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', color: 'linear-gradient(135deg, #0065BD 0%, #FFFFFF 100%)' },
    { id: 'pro-league', name: 'Pro League', country: 'Saudi Arabia', logo: '🇸🇦', color: 'linear-gradient(135deg, #006C35 0%, #FFFFFF 100%)' },
    { id: 'mls', name: 'MLS', country: 'USA', logo: '🇺🇸', color: 'linear-gradient(135deg, #C8102E 0%, #002F65 100%)' },
    { id: 'liga-mx', name: 'Liga MX', country: 'Mexico', logo: '🇲🇽', color: 'linear-gradient(135deg, #006847 0%, #CE1126 100%)' },
    { id: 'brasileirao', name: 'Brasileirão', country: 'Brazil', logo: '🇧🇷', color: 'linear-gradient(135deg, #009739 0%, #FEDD00 100%)' },
    { id: 'argentine-prem', name: 'Primera División', country: 'Argentina', logo: '🇦🇷', color: 'linear-gradient(135deg, #74ACDF 0%, #FFFFFF 100%)' },
    { id: 'j-league', name: 'J1 League', country: 'Japan', logo: '🇯🇵', color: 'linear-gradient(135deg, #BC002D 0%, #FFFFFF 100%)' },
    { id: 'k-league', name: 'K League 1', country: 'South Korea', logo: '🇰🇷', color: 'linear-gradient(135deg, #003478 0%, #CD2E3A 100%)' },
    { id: 'csl', name: 'Chinese Super League', country: 'China', logo: '🇨🇳', color: 'linear-gradient(135deg, #DE2910 0%, #FFDE00 100%)' },
    { id: 'a-league', name: 'A-League', country: 'Australia', logo: '🇦🇺', color: 'linear-gradient(135deg, #00008B 0%, #FFFFFF 100%)' }
  ];

  leagueGroups = signal<LeagueGroup[]>([
    {
      title: '⭐ Top 5 Leagues',
      collapsed: false,
      leagues: [
        this.allLeagues.find(l => l.id === 'premier-league')!,
        this.allLeagues.find(l => l.id === 'la-liga')!,
        this.allLeagues.find(l => l.id === 'serie-a')!,
        this.allLeagues.find(l => l.id === 'bundesliga')!,
        this.allLeagues.find(l => l.id === 'ligue-1')!
      ]
    },
    {
      title: '🏆 International Competitions',
      collapsed: false,
      leagues: [
        this.allLeagues.find(l => l.id === 'champions-league')!,
        this.allLeagues.find(l => l.id === 'europa-league')!,
        this.allLeagues.find(l => l.id === 'conference-league')!
      ]
    },
    {
      title: '🌍 Europe',
      collapsed: true,
      leagues: [
        this.allLeagues.find(l => l.id === 'eredivisie')!,
        this.allLeagues.find(l => l.id === 'primeira-liga')!,
        this.allLeagues.find(l => l.id === 'super-lig')!,
        this.allLeagues.find(l => l.id === 'jupiler-pro')!,
        this.allLeagues.find(l => l.id === 'scottish-prem')!,
        this.allLeagues.find(l => l.id === 'championship')!,
        this.allLeagues.find(l => l.id === 'ligue-2')!,
        this.allLeagues.find(l => l.id === 'serie-b')!,
        this.allLeagues.find(l => l.id === 'segunda-division')!,
        this.allLeagues.find(l => l.id === '2-bundesliga')!
      ]
    },
    {
      title: '🌎 Americas',
      collapsed: true,
      leagues: [
        this.allLeagues.find(l => l.id === 'mls')!,
        this.allLeagues.find(l => l.id === 'liga-mx')!,
        this.allLeagues.find(l => l.id === 'brasileirao')!,
        this.allLeagues.find(l => l.id === 'argentine-prem')!
      ]
    },
    {
      title: '🌏 Asia & Pacific',
      collapsed: true,
      leagues: [
        this.allLeagues.find(l => l.id === 'pro-league')!,
        this.allLeagues.find(l => l.id === 'j-league')!,
        this.allLeagues.find(l => l.id === 'k-league')!,
        this.allLeagues.find(l => l.id === 'csl')!,
        this.allLeagues.find(l => l.id === 'a-league')!
      ]
    }
  ]);

  toggleGroup(group: LeagueGroup) {
    group.collapsed = !group.collapsed;
    this.leagueGroups.set([...this.leagueGroups()]);
  }
}
