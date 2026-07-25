import type { Game } from '../types/models/game.model';
import { getGameResult } from '../utils/gameResultUtils';
import WinLossBadge from './WinLossBadge';
import {
  formatDateForDisplayShortUtil,
  formatTimeForDisplayUtil,
} from '../utils/dateAndTimeUtilities';

type GameProps = {
  gameData: Game;
};

function GameListRow({ gameData }: GameProps) {
  const {
    date,
    homeTeamName,
    awayTeamName,
    homeTeamLogo,
    awayTeamLogo,
    startTime,
    detailedState,
  } = gameData;

  const { bjWon, scoresAvailable, bjIsAway } = getGameResult(gameData);
  const opponentName = bjIsAway ? homeTeamName : awayTeamName;
  const opponentLogo = bjIsAway ? homeTeamLogo : awayTeamLogo;
  const jaysScore = bjIsAway ? gameData.awayTeamScore : gameData.homeTeamScore;
  const opponentScore = bjIsAway
    ? gameData.homeTeamScore
    : gameData.awayTeamScore;

  return (
    <div className="flex items-center justify-between px-5 py-3.5">
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
            {formatDateForDisplayShortUtil(date)}
          </span>
        </div>
      </div>
      {detailedState === 'Postponed' ? (
        <span className="px-2 py-0.5 bg-muted/15 text-primary rounded text-xs font-medium">
          Postponed
        </span>
      ) : scoresAvailable ? (
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold text-primary tabular-nums">
            {jaysScore} – {opponentScore}
          </span>
          <WinLossBadge won={bjWon} />
        </div>
      ) : (
        <span className="text-sm font-medium text-muted">
          {formatTimeForDisplayUtil(startTime)}
        </span>
      )}
    </div>
  );
}

export default GameListRow;
