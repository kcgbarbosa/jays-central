import type { Player } from '../types/models/person.model';

export const filterPlayersBySearch = (players: Player[], query: string) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return players;

  return players.filter((player) =>
    player.fullName.toLowerCase().includes(normalizedQuery)
  );
};
