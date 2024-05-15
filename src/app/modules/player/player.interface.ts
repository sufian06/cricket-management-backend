export type IPlayer = {
  name: string;
  contactNo?: string;
  age?: number;
  image?: string;
  role: 'batsman' | 'bowler' | 'all-rounder';
  battingStyle: 'right-handed' | 'left-handed';
  bowlingArm?: 'right-arm' | 'left-arm';
  bowlingStyle?: 'fast' | 'medium' | 'off-spin' | 'leg-spin' | 'chainaman';
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
