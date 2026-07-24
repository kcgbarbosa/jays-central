import type { Game } from '../types/models/game.model';
import { getLastTenRecord } from './gameResultUtils';

describe('compute last 10 games record', () => {
  const finalGame = (
    awayTeamName: string,
    awayTeamScore: number,
    homeTeamScore: number
  ) =>
    ({
      detailedState: 'Final',
      awayTeamName,
      homeTeamName: 'Toronto Blue Jays',
      awayTeamScore,
      homeTeamScore,
    }) as Game;

  it('counts Blue Jays wins and losses from finished games', () => {
    const games = [
      finalGame('New York Yankees', 2, 5),
      finalGame('New York Yankees', 6, 3),
    ];
    expect(getLastTenRecord(games)).toEqual({ wins: 1, losses: 1 });
  });

  it('ignores games that are not yet final', () => {
    const games = [
      { detailedState: 'Preview' } as Game,
      finalGame('New York Yankees', 2, 5),
    ];
    expect(getLastTenRecord(games)).toEqual({ wins: 1, losses: 0 });
  });

  it('only considers the most recent 10 finished games', () => {
    const wins = Array.from({ length: 12 }, () =>
      finalGame('New York Yankees', 0, 1)
    );
    const losses = Array.from({ length: 2 }, () =>
      finalGame('New York Yankees', 1, 0)
    );
    expect(getLastTenRecord([...wins, ...losses])).toEqual({
      wins: 8,
      losses: 2,
    });
  });
});
