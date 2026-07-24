export type ALRecords = {
  teamId: number;
  divisionId: number;
  teamName: string;
  divisionRank: string;
  wildCardRank: string | null;
  gamesPlayed: number;
  gamesBack: string;
  wildCardGamesBack: string;
  wins: number;
  losses: number;
  runDiff: number;
  winPercentage: string;
  hasWildCard: boolean;
  hasClinched: false;
  streakAbbr: string;
  streakType: string;
  streakLength: number;
};
