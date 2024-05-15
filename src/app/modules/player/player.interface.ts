export type IPlayer = {
  name: string;
  contactNo?: string;
  age?: number;
  image?: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder';
  battingStyle: 'Right-handed' | 'Left-handed';
  bowlingArm?: 'Right-arm' | 'Left-arm';
  bowlingStyle?: 'Fast' | 'Medium' | 'Off-spin' | 'Leg-spin' | 'Chainaman';
  isCaptain?: boolean;
  isWicketKeeper?: boolean;
  matches: number;
  ininges: number;
  notOut: number;
  runs: number;
  playedBalls: number;
  highestScore: number;
  average: number;
  stikerate: number;
  fifty: number;
  thirty: number;
  sixes: number;
  fours: number;
  overs: number;
  balls: number;
  wickets: number;
  givenRuns: number;
  economy: number;
};

export type IPlayerFilters = {
  searchTerm?: string;
  role?: string;
  battingStyle?: string;
  bowlingArm?: string;
  bowlingStyle?: string;
  isWicketKeeper?: boolean;
};
