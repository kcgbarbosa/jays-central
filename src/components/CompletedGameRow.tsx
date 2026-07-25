import type { Game } from '../types/models/game.model';
import { getGameResult } from '../utils/gameResultUtils';
import WinLossBadge from './WinLossBadge';
import { teamAbbreviator } from '../utils/teamAbbreviator';
import { formatDateForDisplayShortUtil } from '../utils/dateAndTimeUtilities';

type GameProps = {
  gameData: Game;
};

export function CompletedGameRow({ gameData }: GameProps) {
  const {
    date,
    homeTeamScore,
    awayTeamScore,
    homeTeamName,
    awayTeamName,
    homeTeamLogo,
    awayTeamLogo,
    detailedState,
  } = gameData;

  if (detailedState === 'Postponed') {
    return (
      <tr className="border-b border-border bg-background hover:bg-muted/5 transition-colors duration-150 ">
        <td className="">
          <span className="ml-2 px-2 py-0.5 bg-muted/15 text-primary rounded text-xs font-medium">
            Postponed
          </span>
        </td>
        <td className="px-2 py-2.5 sm:px-4 sm:py-3 min-w-0 sm:text-center">
          <div className="flex items-center gap-1.5 text-sm text-muted sm:justify-center">
            <img
              className="size-5 shrink-0 object-contain opacity-40"
              src={awayTeamLogo}
              alt={awayTeamName}
            />
            <span className="sm:hidden">{teamAbbreviator(awayTeamName)}</span>
            <span className="hidden sm:inline">{awayTeamName}</span>
            <span className="text-muted text-xs">@</span>
            <img
              className="size-5 shrink-0 object-contain opacity-40"
              src={homeTeamLogo}
              alt={homeTeamName}
            />
            <span className="sm:hidden">{teamAbbreviator(homeTeamName)}</span>
            <span className="hidden sm:inline">{homeTeamName}</span>
            <span className="ml-2 px-2 py-0.5 bg-muted/15 text-primary rounded text-xs font-medium">
              Postponed
            </span>
          </div>
        </td>
      </tr>
    );
  }

  const {
    awayWon,
    bjWon: isBlueJaysWinner,
    scoresAvailable,
  } = getGameResult(gameData);
  const homeWon = scoresAvailable && !awayWon;

  return (
    <tr
      className={`border-b border-border transition-colors duration-150 ${
        isBlueJaysWinner && scoresAvailable
          ? 'bg-primary/5 hover:bg-primary/10'
          : 'bg-background hover:bg-muted/10'
      }`}
    >
      <td className="pl-4 pr-2 py-2.5 sm:px-4 sm:py-3 text-xs font-medium text-muted whitespace-nowrap w-px">
        {formatDateForDisplayShortUtil(date)}
      </td>
      <td className="px-2 py-2.5 sm:px-4 sm:py-3 min-w-0 sm:text-center">
        <div className="flex items-center gap-2 text-sm sm:justify-center">
          <div
            className={`flex items-center gap-1.5 ${awayWon ? 'font-bold text-primary' : 'text-muted'}`}
          >
            <img
              className={`size-5 shrink-0 object-contain ${!awayWon && 'opacity-50'}`}
              src={awayTeamLogo}
              alt={awayTeamName}
            />
            <span className="sm:hidden">{teamAbbreviator(awayTeamName)}</span>
            <span className="hidden sm:inline">{awayTeamName}</span>
            <span>{awayTeamScore}</span>
          </div>
          <span className="text-muted text-xs">@</span>
          <div
            className={`flex items-center gap-1.5 ${homeWon ? 'font-bold text-primary' : 'text-muted'}`}
          >
            <img
              className={`size-5 shrink-0 object-contain ${!homeWon && 'opacity-50'}`}
              src={homeTeamLogo}
              alt={homeTeamName}
            />
            <span className="sm:hidden">{teamAbbreviator(homeTeamName)}</span>
            <span className="hidden sm:inline">{homeTeamName}</span>
            <span>{homeTeamScore}</span>
          </div>
          {scoresAvailable && <WinLossBadge won={isBlueJaysWinner} />}
        </div>
      </td>
    </tr>
  );
}

export default CompletedGameRow;
