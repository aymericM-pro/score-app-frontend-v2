export interface Team {
  id: number;
  name: string;
  logo: string;
  shortName: string;
}

export interface Match {
  id: number;
  matchday: number;
  date: string;
  time: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  status: 'scheduled' | 'live' | 'finished';
}

export interface Standing {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  home?: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
  };
  away?: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
  };
}

export interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  color: string;
}

export interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
  team: Team;
  nationality: string;
  age: number;
  photo?: string;
}

export interface PlayerStats {
  player: Player;
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
}
