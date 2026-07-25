import FeaturedGameCard from '../components/FeaturedGameCard';
import ALStandings from '../components/ALStandings';
import StatLeaderCard from '../components/StatLeaderCard';
import RecentResultsCard from '../components/RecentResultsCard';
import { useContext } from 'react';
import { PlayerContext, HeroGameContext } from '../store/contexts';
import { getStatLeader } from '../utils/statisticUtilities';

const MIN_INNINGS_PITCHED_FOR_LEADER = 20;

function HomePage() {
  const playerData = useContext(PlayerContext);
  const heroGameData = useContext(HeroGameContext);

  const homeRunLeader = getStatLeader(
    playerData,
    (d) => d.hitting?.homeRuns ?? -1
  );

  const hitLeader = getStatLeader(playerData, (d) => d.hitting?.hits ?? -1);

  const qualifiedPitchers = playerData.filter(
    (d) =>
      d.pitching &&
      parseFloat(d.pitching.inningsPitched) >= MIN_INNINGS_PITCHED_FOR_LEADER
  );
  const strikeoutLeader = getStatLeader(
    qualifiedPitchers,
    (d) => d.pitching?.strikeOuts ?? -1
  );

  return (
    <main className="flex-1 w-full bg-background">
      <h1 className="sr-only">Home Page</h1>

      <section className="bg-primary">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-white/70 pb-8">
            Featured Game
          </p>
          <FeaturedGameCard gameDataProp={heroGameData} />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 space-y-12 sm:space-y-16">
        <section>
          <h2 className="text-2xl font-semibold text-primary pb-6">
            Stat Leaders
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatLeaderCard
              statName="Home Runs"
              playerName={homeRunLeader?.fullName}
              playerID={homeRunLeader?.id}
              statValue={homeRunLeader?.hitting?.homeRuns}
              jerseyNumber={`#${homeRunLeader?.jerseyNumber}`}
              positionAbbreviation={homeRunLeader?.positionAbbreviation}
              statAbbreviation="HR"
            />
            <StatLeaderCard
              statName="Hits"
              playerName={hitLeader?.fullName}
              playerID={hitLeader?.id}
              statValue={hitLeader?.hitting?.hits}
              jerseyNumber={`#${hitLeader?.jerseyNumber}`}
              positionAbbreviation={hitLeader?.positionAbbreviation}
              statAbbreviation="H"
            />
            <StatLeaderCard
              statName="Strikeouts"
              playerName={strikeoutLeader?.fullName}
              playerID={strikeoutLeader?.id}
              statValue={strikeoutLeader?.pitching?.strikeOuts}
              jerseyNumber={`#${strikeoutLeader?.jerseyNumber}`}
              positionAbbreviation={strikeoutLeader?.positionAbbreviation}
              statAbbreviation="K"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ALStandings />
          <RecentResultsCard />
        </div>
      </div>
    </main>
  );
}
export default HomePage;
