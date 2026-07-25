import type { Game } from '../types/models/game.model';

export function getGameResult(game: Game) {
  const { homeTeamScore, awayTeamScore, awayTeamName } = game;

  const bjIsAway = awayTeamName.includes('Blue Jays');

  if (homeTeamScore === undefined || awayTeamScore === undefined) {
    return { scoresAvailable: false, awayWon: false, bjWon: false, bjIsAway };
  }

  const awayWon = awayTeamScore > homeTeamScore;
  const bjWon = bjIsAway ? awayWon : !awayWon;

  return { scoresAvailable: true, awayWon, bjWon, bjIsAway };
}

export function getLastTenRecord(games: Game[]) {
  return games
    .filter((game) => game.detailedState === 'Final')
    .slice(-10)
    .reduce(
      (acc, game) => {
        const { bjWon } = getGameResult(game);
        if (bjWon) {
          acc.wins++;
        } else {
          acc.losses++;
        }
        return acc;
      },
      { wins: 0, losses: 0 }
    );
}
