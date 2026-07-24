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
    <main className="bg-muted/5 flex-1 w-full p-4 overflow-hidden">
      <h1 className="sr-only">Home Page</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div>
            <FeaturedGameCard gameDataProp={heroGameData} />
          </div>
          <div>
            <RecentResultsCard />
          </div>
        </div>

        <section className="lg:col-span-1 flex flex-col gap-6">
          <div className="pb-4">
            <ALStandings />
          </div>
          <div>
            <StatLeaderCard
              statName="Home Runs"
              playerName={homeRunLeader?.fullName}
              playerID={homeRunLeader?.id}
              statValue={homeRunLeader?.hitting?.homeRuns}
              jerseyNumber={`#${homeRunLeader?.jerseyNumber}`}
              positionAbbreviation={homeRunLeader?.positionAbbreviation}
              statAbbreviation="HR"
            />
          </div>
          <div>
            <StatLeaderCard
              statName="Hits"
              playerName={hitLeader?.fullName}
              playerID={hitLeader?.id}
              statValue={hitLeader?.hitting?.hits}
              jerseyNumber={`#${hitLeader?.jerseyNumber}`}
              positionAbbreviation={hitLeader?.positionAbbreviation}
              statAbbreviation="H"
            />
          </div>
          <div>
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
      </div>
    </main>
  );
}
export default HomePage;
