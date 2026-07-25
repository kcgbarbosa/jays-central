import { useContext } from 'react';
import { getGameResult, getLastTenRecord } from '../utils/gameResultUtils';
import { HeroGameContext, ScheduleContext } from '../store/contexts';
import WinLossBadge from './WinLossBadge';
import {
  isGameInPast,
  formatDateForDisplayShortUtil,
} from '../utils/dateAndTimeUtilities';

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
        {pastGames.map((d) => {
          const { bjWon, scoresAvailable, bjIsAway } = getGameResult(d);
          const opponentName = bjIsAway ? d.homeTeamName : d.awayTeamName;
          const opponentLogo = bjIsAway ? d.homeTeamLogo : d.awayTeamLogo;
          const jaysScore = bjIsAway ? d.awayTeamScore : d.homeTeamScore;
          const opponentScore = bjIsAway ? d.homeTeamScore : d.awayTeamScore;

          return (
            <div
              key={d.gamePk}
              className="flex items-center justify-between px-5 py-3.5"
            >
              <div className="flex items-center gap-3">
                <img
                  alt={`${opponentName} logo`}
                  src={opponentLogo}
                  className="h-9 w-9 object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-primary">
                    {bjIsAway ? '@' : 'vs'} {opponentName}
                  </span>
                  <span className="text-xs text-muted">
                    {formatDateForDisplayShortUtil(d.date)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-base font-semibold text-primary tabular-nums">
                  {scoresAvailable ? `${jaysScore} – ${opponentScore}` : '–'}
                </span>
                {scoresAvailable && <WinLossBadge won={bjWon} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentResultsCard;
