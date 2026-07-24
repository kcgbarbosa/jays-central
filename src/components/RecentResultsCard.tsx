import { useContext } from 'react';
import { teamAbbreviator } from '../utils/teamAbbreviator';
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
      <div className="flex items-center gap-3 py-4">
        <h2 className="text-base font-semibold text-primary">Past Results</h2>
        <span className="text-xs font-semibold text-muted uppercase tracking-wider border border-border px-2 py-1">
          L10: {lastTenRecord.wins}-{lastTenRecord.losses}
        </span>
      </div>
      <div className="space-y-2">
        {pastGames.map((d) => {
          const { bjWon, scoresAvailable, awayWon } = getGameResult(d);

          return (
            <div
              key={d.gamePk}
              className={`bg-background border border-border rounded-xl shadow-sm px-5 py-3 flex flex-col border-l-4
                ${bjWon ? 'border-l-primary' : 'border-l-border'}`}
            >
              <div className="flex relative items-center justify-between ">
                <div className="flex items-center gap-2">
                  <img
                    alt={`${d.awayTeamName} logo`}
                    src={d.awayTeamLogo}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="hidden sm:inline text-sm font-medium text-primary">
                    {teamAbbreviator(d.awayTeamName)}
                  </span>
                </div>

                <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                  <span
                    className={`text-xl font-bold ${awayWon ? 'text-primary' : 'text-muted'}`}
                  >
                    {d.awayTeamScore ?? '–'}
                  </span>
                  <span className="text-muted text-sm">–</span>
                  <span
                    className={`text-xl font-bold pr-2 ${!awayWon && scoresAvailable ? 'text-primary' : 'text-muted'}`}
                  >
                    {d.homeTeamScore ?? '–'}
                  </span>
                  {scoresAvailable && <WinLossBadge won={bjWon} />}
                  <span className="hidden sm:inline text-xs text-muted pl-1">
                    {formatDateForDisplayShortUtil(d.date)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-sm font-medium text-primary">
                    {teamAbbreviator(d.homeTeamName)}
                  </span>
                  <img
                    src={d.homeTeamLogo}
                    alt={`${d.homeTeamName} logo`}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentResultsCard;
