import { useContext, useMemo, useState } from 'react';
import { ScheduleContext, SeasonContext } from '../store/contexts';
import GameListRow from './GameListRow';
import { isGameInPast } from '../utils/dateAndTimeUtilities';

type ScheduleFilterType =
  'Remaining Games' | 'Completed Games' | 'spring' | 'postSeason';

function ScheduleTable() {
  const scheduleData = useContext(ScheduleContext);
  const seasonData = useContext(SeasonContext);
  const [scheduleFilter, setScheduleFilter] =
    useState<ScheduleFilterType>('Remaining Games');
  const handleSetScheduleFilter = (filter: ScheduleFilterType) => {
    setScheduleFilter(filter);
  };

  const regularSeasonStartDate = seasonData[0]?.regularSeasonStartDate ?? '';
  const regularSeasonEndDate = seasonData[0]?.regularSeasonEndDate ?? '';

  const filteredGames = useMemo(() => {
    if (scheduleFilter === 'Remaining Games')
      return scheduleData.filter(
        (d) => !isGameInPast(d) && d.detailedState !== 'Postponed'
      );

    if (scheduleFilter === 'Completed Games')
      return regularSeasonStartDate && regularSeasonEndDate
        ? scheduleData.filter(
            (d) =>
              isGameInPast(d) &&
              d.date >= regularSeasonStartDate &&
              d.date <= regularSeasonEndDate &&
              d.detailedState !== 'Live'
          )
        : [];

    if (scheduleFilter) {
      const startTime = new Date(
        seasonData[0][`${scheduleFilter}StartDate`]
      ).getTime();
      const endTime = new Date(
        seasonData[0][`${scheduleFilter}EndDate`]
      ).getTime();
      return scheduleData.filter((d) => {
        const gameTime = new Date(d.date).getTime();
        return gameTime >= startTime && gameTime <= endTime;
      });
    }
    return scheduleData;
  }, [
    scheduleFilter,
    scheduleData,
    seasonData,
    regularSeasonStartDate,
    regularSeasonEndDate,
  ]);

  const isCompleted =
    scheduleFilter !== 'Remaining Games' && (scheduleFilter as string) !== '';

  const filterBtnBase =
    'px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150 cursor-pointer';
  const filterBtnActive = 'bg-primary/10 text-primary hover:bg-primary/20';
  const filterBtnInactive =
    'text-white/70 hover:text-white hover:bg-primary/80';

  return (
    <div>
      <div className="-mx-4 sm:mx-0 border-y sm:border border-border sm:rounded-xl overflow-hidden">
        <div className="bg-primary px-4 py-3 flex items-center gap-2">
          <button
            className={`${filterBtnBase} ${scheduleFilter === 'Remaining Games' ? filterBtnActive : filterBtnInactive}`}
            onClick={() => handleSetScheduleFilter('Remaining Games')}
          >
            Remaining Games
          </button>
          <label htmlFor="season-filter" className="sr-only">
            View Season
          </label>
          <select
            id="season-filter"
            className={`${filterBtnBase} ${isCompleted ? filterBtnActive : filterBtnInactive}`}
            value={scheduleFilter}
            onChange={(e) =>
              handleSetScheduleFilter(e.target.value as ScheduleFilterType)
            }
          >
            <option value="">View Season:</option>
            <option value="Completed Games">
              {new Date().getFullYear()} Completed Games
            </option>
            <option value="spring">
              {new Date().getFullYear()} Spring Training
            </option>
            <option value="postSeason">
              {new Date().getFullYear()} Postseason
            </option>
          </select>
        </div>
        <div className="divide-y divide-border bg-background">
          {filteredGames.length === 0 ? (
            <div className="text-center p-4 text-muted text-sm">
              No games found.
            </div>
          ) : (
            filteredGames.map((d) => (
              <GameListRow key={d.gamePk} gameData={d} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ScheduleTable;
