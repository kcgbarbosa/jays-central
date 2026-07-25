import type { PitcherRef } from '../types/models/linescore.model';

type PitcherMatchupCardProps = {
  gameStatus: string;
  pitcherA?: PitcherRef;
  pitcherB?: PitcherRef;
  pitcherC?: PitcherRef;
};

const PitcherMatchupCard = ({
  gameStatus,
  pitcherA,
  pitcherB,
  pitcherC,
}: PitcherMatchupCardProps) => {
  return (
    <div className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 mt-8">
      <h2 className="text-xs font-semibold text-white/70 uppercase tracking-widest text-center mb-3">
        {gameStatus === 'Preview' ? 'Probable Pitchers' : 'Game Decisions'}
      </h2>

      <div className="flex flex-col items-start justify-center gap-2 sm:flex-row sm:items-center sm:gap-6">
        {/* Pitcher A */}
        <div className="flex items-center gap-3">
          <img
            alt={`${pitcherA?.fullName} headshot`}
            src={
              gameStatus === 'Preview'
                ? pitcherA?.playerActionShotUrl
                : pitcherA?.playerHeadshotUrl
            }
            className="size-15 rounded-full object-cover bg-white/10 md:size-30"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-white">
              {pitcherA?.fullName}
            </span>
            {gameStatus === 'Preview' && (
              <span className="text-xs text-white/70 uppercase">Away</span>
            )}
            {gameStatus === 'Final' && (
              <span className="font-bold text-2xl text-white">W</span>
            )}
          </div>
        </div>
        <span className="hidden sm:block text-base text-center font-bold text-white/70">
          VS.
        </span>

        {/* Pitcher B */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col sm:text-right">
            <span className="text-sm font-semibold text-white">
              {pitcherB?.fullName}
            </span>
            {gameStatus === 'Preview' && (
              <span className="text-xs text-white/70 uppercase">Home</span>
            )}
            {gameStatus === 'Final' && (
              <span className="font-bold text-2xl text-accent">L</span>
            )}
          </div>
          <img
            alt={`${pitcherB?.fullName} headshot`}
            src={
              gameStatus === 'Preview'
                ? pitcherB?.playerActionShotUrl
                : pitcherB?.playerHeadshotUrl
            }
            className="order-first sm:order-last size-15 rounded-full object-cover bg-white/10 md:size-30"
          />
        </div>
      </div>
      {pitcherC && (
        <div className="flex items-center justify-start gap-2 mt-3 pt-3 border-t border-white/20 sm:justify-center">
          <img
            alt={`${pitcherC.fullName} headshot`}
            src={pitcherC.playerHeadshotUrl}
            className="size-15 rounded-full object-cover bg-white/10"
          />
          <span className="text-xs font-medium text-white">
            {pitcherC.fullName}
          </span>
          <span className="text-xs font-bold text-white">S</span>
        </div>
      )}
    </div>
  );
};

export default PitcherMatchupCard;
