import { Injectable } from '@angular/core';
import { Team, Match, Standing, Player, PlayerStats } from '@app/models/football.models';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private teams: Team[] = [
    { id: 1, name: 'Paris Saint-Germain', shortName: 'PSG', logo: '⚽' },
    { id: 2, name: 'Olympique de Marseille', shortName: 'OM', logo: '⚽' },
    { id: 3, name: 'Olympique Lyonnais', shortName: 'OL', logo: '⚽' },
    { id: 4, name: 'AS Monaco', shortName: 'ASM', logo: '⚽' },
    { id: 5, name: 'Lille OSC', shortName: 'LOSC', logo: '⚽' },
    { id: 6, name: 'OGC Nice', shortName: 'Nice', logo: '⚽' },
    { id: 7, name: 'Stade Rennais', shortName: 'Rennes', logo: '⚽' },
    { id: 8, name: 'RC Lens', shortName: 'Lens', logo: '⚽' },
    { id: 9, name: 'Stade de Reims', shortName: 'Reims', logo: '⚽' },
    { id: 10, name: 'Montpellier HSC', shortName: 'MHSC', logo: '⚽' },
    { id: 11, name: 'FC Nantes', shortName: 'Nantes', logo: '⚽' },
    { id: 12, name: 'Strasbourg Alsace', shortName: 'RCSA', logo: '⚽' },
    { id: 13, name: 'Stade Brestois', shortName: 'Brest', logo: '⚽' },
    { id: 14, name: 'Le Havre AC', shortName: 'HAC', logo: '⚽' },
    { id: 15, name: 'Toulouse FC', shortName: 'TFC', logo: '⚽' },
    { id: 16, name: 'AJ Auxerre', shortName: 'AJA', logo: '⚽' },
    { id: 17, name: 'Angers SCO', shortName: 'SCO', logo: '⚽' },
    { id: 18, name: 'AS Saint-Étienne', shortName: 'ASSE', logo: '⚽' }
  ];

  private matches: Match[] = this.generateMatches();

  private generateMatches(): Match[] {
    const matches: Match[] = [];
    let matchId = 1;
    const startDate = new Date('2024-08-16');

    for (let matchday = 1; matchday <= 10; matchday++) {
      const shuffledTeams = [...this.teams].sort(() => Math.random() - 0.5);
      let matchIndex = 0;

      for (let i = 0; i < shuffledTeams.length; i += 2) {
        if (i + 1 < shuffledTeams.length) {
          const baseDate = new Date(startDate);
          baseDate.setDate(startDate.getDate() + (matchday - 1) * 7);

          let dayOffset = 0;
          if (matchIndex < 3) {
            dayOffset = 0;
          } else if (matchIndex < 6) {
            dayOffset = 1;
          } else {
            dayOffset = 2;
          }

          const matchDate = new Date(baseDate);
          matchDate.setDate(baseDate.getDate() + dayOffset);

          const match: Match = {
            id: matchId++,
            matchday,
            date: matchDate.toISOString().split('T')[0],
            time: this.getRandomTime(),
            homeTeam: shuffledTeams[i],
            awayTeam: shuffledTeams[i + 1],
            status: matchday < 3 ? 'finished' : matchday === 3 ? 'live' : 'scheduled'
          };

          if (match.status === 'finished') {
            match.homeScore = Math.floor(Math.random() * 4);
            match.awayScore = Math.floor(Math.random() * 4);
          }

          matches.push(match);
          matchIndex++;
        }
      }
    }

    return matches;
  }

  private getRandomTime(): string {
    const times = ['15:00', '17:00', '19:00', '21:00'];
    return times[Math.floor(Math.random() * times.length)];
  }

  getMatches(): Match[] {
    return this.matches;
  }

  getMatchesByMatchday(matchday: number): Match[] {
    return this.matches.filter(m => m.matchday === matchday);
  }

  getTeams(): Team[] {
    return this.teams;
  }

  getStandings(): Standing[] {
    const standings: Standing[] = this.teams.map((team, index) => {
      const teamMatches = this.matches.filter(
        m => m.status === 'finished' && (m.homeTeam.id === team.id || m.awayTeam.id === team.id)
      );

      let won = 0, drawn = 0, lost = 0, goalsFor = 0, goalsAgainst = 0;
      let homeWon = 0, homeDrawn = 0, homeLost = 0, homeGoalsFor = 0, homeGoalsAgainst = 0;
      let awayWon = 0, awayDrawn = 0, awayLost = 0, awayGoalsFor = 0, awayGoalsAgainst = 0;

      teamMatches.forEach(match => {
        const isHome = match.homeTeam.id === team.id;
        const teamScore = isHome ? match.homeScore! : match.awayScore!;
        const opponentScore = isHome ? match.awayScore! : match.homeScore!;

        goalsFor += teamScore;
        goalsAgainst += opponentScore;

        if (teamScore > opponentScore) {
          won++;
          if (isHome) homeWon++;
          else awayWon++;
        } else if (teamScore === opponentScore) {
          drawn++;
          if (isHome) homeDrawn++;
          else awayDrawn++;
        } else {
          lost++;
          if (isHome) homeLost++;
          else awayLost++;
        }

        if (isHome) {
          homeGoalsFor += teamScore;
          homeGoalsAgainst += opponentScore;
        } else {
          awayGoalsFor += teamScore;
          awayGoalsAgainst += opponentScore;
        }
      });

      const played = teamMatches.length;
      const points = won * 3 + drawn;
      const goalDifference = goalsFor - goalsAgainst;

      const homePlayed = teamMatches.filter(m => m.homeTeam.id === team.id).length;
      const awayPlayed = teamMatches.filter(m => m.awayTeam.id === team.id).length;

      return {
        position: index + 1,
        team,
        played,
        won,
        drawn,
        lost,
        goalsFor,
        goalsAgainst,
        goalDifference,
        points,
        home: {
          played: homePlayed,
          won: homeWon,
          drawn: homeDrawn,
          lost: homeLost,
          goalsFor: homeGoalsFor,
          goalsAgainst: homeGoalsAgainst,
          points: homeWon * 3 + homeDrawn
        },
        away: {
          played: awayPlayed,
          won: awayWon,
          drawn: awayDrawn,
          lost: awayLost,
          goalsFor: awayGoalsFor,
          goalsAgainst: awayGoalsAgainst,
          points: awayWon * 3 + awayDrawn
        }
      };
    });

    return standings.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    }).map((standing, index) => ({
      ...standing,
      position: index + 1
    }));
  }

  private players: Player[] = [
    { id: 1, name: 'Kylian Mbappé', number: 7, position: 'Attaquant centre', team: this.teams[0], nationality: 'France', age: 25 },
    { id: 2, name: 'Ousmane Dembélé', number: 10, position: 'Ailier droit', team: this.teams[0], nationality: 'France', age: 26 },
    { id: 3, name: 'Vitinha', number: 17, position: 'Milieu offensif', team: this.teams[0], nationality: 'Portugal', age: 24 },
    { id: 4, name: 'Marquinhos', number: 5, position: 'Défenseur central', team: this.teams[0], nationality: 'Brésil', age: 29 },
    { id: 5, name: 'Gianluigi Donnarumma', number: 1, position: 'Gardien', team: this.teams[0], nationality: 'Italie', age: 25 },
    { id: 6, name: 'Warren Zaïre-Emery', number: 33, position: 'Milieu défensif', team: this.teams[0], nationality: 'France', age: 18 },
    { id: 7, name: 'Bradley Barcola', number: 29, position: 'Ailier gauche', team: this.teams[0], nationality: 'France', age: 21 },
    { id: 8, name: 'Achraf Hakimi', number: 2, position: 'Arrière droit', team: this.teams[0], nationality: 'Maroc', age: 25 },
    { id: 9, name: 'Lucas Hernandez', number: 21, position: 'Arrière gauche', team: this.teams[0], nationality: 'France', age: 28 },
    { id: 10, name: 'Fabián Ruiz', number: 8, position: 'Milieu relayeur', team: this.teams[0], nationality: 'Espagne', age: 28 },
    { id: 11, name: 'Milan Škriniar', number: 37, position: 'Défenseur central', team: this.teams[0], nationality: 'Slovaquie', age: 29 },
    { id: 12, name: 'Randal Kolo Muani', number: 23, position: 'Attaquant centre', team: this.teams[0], nationality: 'France', age: 25 },
    { id: 13, name: 'Lee Kang-in', number: 19, position: 'Milieu offensif', team: this.teams[0], nationality: 'Corée du Sud', age: 23 },
    { id: 14, name: 'Marco Asensio', number: 11, position: 'Ailier droit', team: this.teams[0], nationality: 'Espagne', age: 28 },
    { id: 15, name: 'Danilo Pereira', number: 15, position: 'Milieu défensif', team: this.teams[0], nationality: 'Portugal', age: 32 },
    { id: 16, name: 'Nuno Mendes', number: 25, position: 'Arrière gauche', team: this.teams[0], nationality: 'Portugal', age: 22 },
    { id: 17, name: 'Manuel Ugarte', number: 4, position: 'Milieu défensif', team: this.teams[0], nationality: 'Uruguay', age: 23 },
    { id: 18, name: 'Lucas Beraldo', number: 35, position: 'Défenseur central', team: this.teams[0], nationality: 'Brésil', age: 20 },
    { id: 19, name: 'Arnau Tenas', number: 80, position: 'Gardien', team: this.teams[0], nationality: 'Espagne', age: 23 },
    { id: 20, name: 'Yoram Zague', number: 42, position: 'Arrière droit', team: this.teams[0], nationality: 'France', age: 18 },
    { id: 21, name: 'Carlos Soler', number: 28, position: 'Milieu relayeur', team: this.teams[0], nationality: 'Espagne', age: 27 },
    { id: 22, name: 'Nordi Mukiele', number: 26, position: 'Défenseur central', team: this.teams[0], nationality: 'France', age: 26 },
    { id: 23, name: 'Gonçalo Ramos', number: 9, position: 'Attaquant centre', team: this.teams[0], nationality: 'Portugal', age: 23 },
    { id: 24, name: 'Senny Mayulu', number: 41, position: 'Milieu offensif', team: this.teams[0], nationality: 'France', age: 18 },
    { id: 25, name: 'Ibrahim Mbaye', number: 36, position: 'Milieu défensif', team: this.teams[0], nationality: 'Sénégal', age: 19 },
    { id: 26, name: 'Matvey Safonov', number: 39, position: 'Gardien', team: this.teams[0], nationality: 'Russie', age: 25 },
    { id: 27, name: 'Willian Pacho', number: 51, position: 'Défenseur central', team: this.teams[0], nationality: 'Équateur', age: 22 },
    { id: 28, name: 'Désiré Doué', number: 14, position: 'Ailier gauche', team: this.teams[0], nationality: 'France', age: 19 },
    { id: 29, name: 'João Neves', number: 87, position: 'Milieu relayeur', team: this.teams[0], nationality: 'Portugal', age: 20 },
    { id: 30, name: 'Khvicha Kvaratskhelia', number: 7, position: 'Ailier gauche', team: this.teams[0], nationality: 'Géorgie', age: 23 }
  ];

  getPlayerStats(): PlayerStats[] {
    return this.players.map(player => ({
      player,
      appearances: Math.floor(Math.random() * 15) + 10,
      goals: Math.floor(Math.random() * 20),
      assists: Math.floor(Math.random() * 12),
      yellowCards: Math.floor(Math.random() * 5),
      redCards: Math.random() > 0.8 ? 1 : 0,
      minutesPlayed: Math.floor(Math.random() * 1500) + 500
    }));
  }
}
