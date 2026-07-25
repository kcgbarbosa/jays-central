import { useContext } from 'react';
import { getLastTenRecord } from '../utils/gameResultUtils';
import { HeroGameContext, ScheduleContext } from '../store/contexts';
import GameListRow from './GameListRow';
import { isGameInPast } from '../utils/dateAndTimeUtilities';

function RecentResultsCard() {
  const schedulePreviewData = useContext(ScheduleContext);
  const heroGameData = useContext(HeroGameContext);
  const pastGames = schedulePreviewData
    .filter(
      (d) =>
        isGameInPast(d) === true &&
        d.gamePk !== heroGameData?.gamePk &&
        d.detailedState === 'Final'
    )
    .reverse()
    .slice(0, 7);

  const lastTenRecord = getLastTenRecord(schedulePreviewData);

  return (
    <div>
      <div className="flex items-center gap-3 pb-6">
        <h2 className="text-2xl font-semibold text-primary">Past Results</h2>
        <span className="text-xs font-semibold text-muted uppercase tracking-wider border border-border px-2 py-1">
          L10: {lastTenRecord.wins}-{lastTenRecord.losses}
        </span>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm divide-y divide-border">
        {pastGames.map((d) => (
          <GameListRow key={d.gamePk} gameData={d} />
        ))}
      </div>
    </div>
  );
}

export default RecentResultsCard;
