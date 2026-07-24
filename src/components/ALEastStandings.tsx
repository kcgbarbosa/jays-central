import { useContext, useMemo, useState } from 'react';
import { StandingsContext } from '../store/contexts';

const BLUEJAYS_TEAM_ID = Number(import.meta.env.VITE_BLUEJAYS_TEAMID);

type StandingsView = 'east' | 'wildcard';

function ALEastStandings() {
  const standingsData = useContext(StandingsContext);
  const [view, setView] = useState<StandingsView>('east');

  const teams = useMemo(() => {
    if (view === 'wildcard') {
      return standingsData
        .filter((team) => team.wildCardRank !== null)
        .sort((a, b) => Number(a.wildCardRank) - Number(b.wildCardRank));
    }
    return standingsData
      .filter((team) => team.divisionId === 201)
      .sort((a, b) => Number(a.divisionRank) - Number(b.divisionRank));
  }, [standingsData, view]);

  return (
    <div className="bg-background p-4 border border-border rounded-xl shadow-sm">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-base font-semibold text-primary">
          {view === 'east' ? 'AL East Standings' : 'Wild Card Standings'}
        </h2>
        <div className="flex border border-border text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setView('east')}
            className={`px-3 py-1.5 cursor-pointer transition-colors ${view === 'east' ? 'bg-primary text-white' : 'text-muted hover:bg-muted/10'}`}
          >
            AL East
          </button>
          <button
            onClick={() => setView('wildcard')}
            className={`px-3 py-1.5 cursor-pointer transition-colors border-l border-border ${view === 'wildcard' ? 'bg-primary text-white' : 'text-muted hover:bg-muted/10'}`}
          >
            Wild Card
          </button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-xs font-semibold text-muted uppercase tracking-wider border-b border-border">
            <th scope="col" className="pb-2 text-left font-semibold">
              Team
            </th>
            <th scope="col" className="pb-2 text-left font-semibold">
              W
            </th>
            <th scope="col" className="pb-2 text-left font-semibold">
              L
            </th>
            <th scope="col" className="pb-2 text-left font-semibold">
              PCT
            </th>
            <th scope="col" className="pb-2 text-left font-semibold">
              GB
            </th>
            <th
              scope="col"
              className="pb-2 text-left font-semibold hidden sm:table-cell"
            >
              STRK
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {teams.map((team) => (
            <tr
              key={team.teamId}
              className={`text-sm text-primary ${team.teamId === BLUEJAYS_TEAM_ID ? 'bg-primary/10 font-semibold' : ''} ${view === 'wildcard' && team.wildCardRank === '3' ? 'border-b-2 border-primary' : ''}`}
            >
              <td className="py-2">{team.teamName}</td>
              <td className="py-2">{team.wins}</td>
              <td className="py-2">{team.losses}</td>
              <td className="py-2">{team.winPercentage}</td>
              <td className="py-2">
                {view === 'wildcard' ? team.wildCardGamesBack : team.gamesBack}
              </td>
              <td className="py-2 hidden sm:table-cell">{team.streakAbbr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ALEastStandings;
