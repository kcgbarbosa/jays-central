import type { Game } from '../types/models/game.model';

export const isGameInPast = (game: Game) => {
  const todaysDate = new Date().toLocaleDateString('en-CA');

  if (game.detailedState === 'Postponed') return true;
  if (game.date < todaysDate) return true;
  if (game.date > todaysDate) return false;

  return game.startTime < new Date().toISOString();
};

export const getHeroGameDateUtil = (scheduleData: Game[]): Game | null => {
  const todaysDate = new Date().toLocaleDateString('en-CA');

  const todaysGames = scheduleData
    .filter((d) => d.date === todaysDate)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  if (todaysGames.length > 0) {
    const liveGame = todaysGames.find((g) => g.abstractGameState === 'Live');
    if (liveGame) return liveGame;

    const upcomingToday = todaysGames.find((g) => !isGameInPast(g));
    if (upcomingToday) return upcomingToday;

    return todaysGames[todaysGames.length - 1];
  }
  const upcomingGames = scheduleData.filter((game) => !isGameInPast(game));
  if (upcomingGames.length === 0) return null;

  return upcomingGames.reduce((nextGame, game) =>
    new Date(game.date).getTime() < new Date(nextGame.date).getTime()
      ? game
      : nextGame
  );
};

//
// UI Time & Date Formatting Utils
//

export const formatTimeForDisplayUtil = (dateString: string): string => {
  const stringToDate = new Date(dateString);
  if (isNaN(stringToDate.getTime())) return 'Invalid date';

  let hours = stringToDate.getHours();
  const AMorPM = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  const minutes = stringToDate.getMinutes();

  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${AMorPM}`.toString();
};

export const formatDateForDisplayLongUtil = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00');

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return formattedDate;
};

export const formatDateForDisplayShortUtil = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00');

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return formattedDate;
};
