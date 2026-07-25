type StatLeaderCardProps = {
  statName?: string | undefined;
  playerName?: string | undefined;
  playerID?: number | undefined;
  statValue?: number | string | undefined;
  jerseyNumber?: string | undefined;
  positionAbbreviation?: string;
  statAbbreviation?: string;
};

function StatLeaderCard({
  statName,
  playerName,
  playerID,
  statValue,
  jerseyNumber,
  positionAbbreviation,
  statAbbreviation,
}: StatLeaderCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-muted uppercase tracking-widest pb-3">
        {statName}
      </h3>
      <div className="flex items-center gap-4">
        <img
          alt={`${playerName} headshot`}
          src={`https://midfield.mlbstatic.com/v1/people/${playerID}/spots/120`}
          className="size-20 rounded-lg object-contain bg-background"
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-primary">
            {playerName}
          </span>
          <span className="text-xs text-muted uppercase tracking-wider">
            {jerseyNumber} · {positionAbbreviation}
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-bold text-primary">{statValue}</span>
            <span className="text-sm text-muted uppercase tracking-wider">
              {statAbbreviation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatLeaderCard;
