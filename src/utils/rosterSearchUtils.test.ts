import type { Player } from '../types/models/person.model';
import { filterPlayersBySearch } from './rosterSearchUtils';

describe('filter players by search query', () => {
  const players = [
    { fullName: 'Vladimir Guerrero Jr.' },
    { fullName: 'Bo Bichette' },
    { fullName: 'George Springer' },
  ] as Player[];

  it('returns players whose name includes the query, case-insensitive', () => {
    expect(filterPlayersBySearch(players, 'bo')).toEqual([
      { fullName: 'Bo Bichette' },
    ]);
  });

  it('returns all players when query is empty', () => {
    expect(filterPlayersBySearch(players, '')).toEqual(players);
  });

  it('returns empty array when no player matches', () => {
    expect(filterPlayersBySearch(players, 'zzz')).toEqual([]);
  });
});
