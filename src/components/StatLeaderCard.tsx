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
    <div className="bg-background border border-border rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
      <h2 className="text-sm font-semibold text-primary uppercase tracking-widest pb-3">
        {statName}
      </h2>
      <div className="flex items-center gap-4">
        <img
          alt={`${playerName} headshot`}
          src={`https://midfield.mlbstatic.com/v1/people/${playerID}/spots/120`}
          className="size-25 rounded-lg object-contain bg-background "
        />
        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold text-primary">
            {playerName}
            <span className="text-accent"> {jerseyNumber}</span>
          </span>
          <span className="text-sm text-muted uppercase tracking-wider">
            {positionAbbreviation}
          </span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-4xl font-bold text-primary">{statValue}</span>
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
