import {
  formatTimeForDisplayUtil,
  formatDateForDisplayShortUtil,
} from '../utils/dateAndTimeUtilities';
import type { Game } from '../types/models/game.model';
import { teamAbbreviator } from '../utils/teamAbbreviator';
type GameProps = {
  gameData: Game;
};

function UpcomingGameRow({ gameData }: GameProps) {
  const {
    date,
    homeTeamName,
    awayTeamName,
    homeTeamLogo,
    awayTeamLogo,
    startTime,
  } = gameData;

  return (
    <tr className="border-b border-border hover:bg-muted/10 transition-colors duration-150">
      <td className="pl-4 pr-2 py-2.5 sm:px-4 sm:py-3 text-xs font-medium text-muted whitespace-nowrap w-px">
        {formatDateForDisplayShortUtil(date)}
      </td>

      <td className="px-2 py-2.5 sm:px-4 sm:py-3 min-w-0 sm:text-center">
        <div className="flex items-center gap-1.5 font-medium text-primary text-sm sm:justify-center">
          <img
            className="size-5 shrink-0 object-contain"
            src={awayTeamLogo}
            alt={awayTeamName}
          />
          <span className="sm:hidden">{teamAbbreviator(awayTeamName)}</span>
          <span className="hidden sm:inline">{awayTeamName}</span>
          <span className="text-muted text-xs">@</span>
          <img
            className="size-5 shrink-0 object-contain"
            src={homeTeamLogo}
            alt={homeTeamName}
          />
          <span className="sm:hidden">{teamAbbreviator(homeTeamName)}</span>
          <span className="hidden sm:inline">{homeTeamName}</span>
        </div>
        <div className="sm:hidden mt-0.5 text-xs text-muted">
          {formatTimeForDisplayUtil(startTime)}
        </div>
      </td>

      <td className="px-4 py-3 text-sm text-muted whitespace-nowrap hidden sm:table-cell">
        {formatTimeForDisplayUtil(startTime)}
      </td>
    </tr>
  );
}

export default UpcomingGameRow;
