import { useContext, useMemo, useState } from 'react';
import { StandingsContext } from '../store/contexts';

const BLUEJAYS_TEAM_ID = Number(import.meta.env.VITE_BLUEJAYS_TEAMID);

type StandingsView = 'east' | 'wildcard';

function ALStandings() {
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
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6">
        <h2 className="text-2xl font-semibold text-primary">
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
      <div className="rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-xs font-semibold text-muted uppercase tracking-wider border-b border-border">
              <th scope="col" className="px-3 pb-2 text-left font-semibold">
                Team
              </th>
              <th scope="col" className="px-3 pb-2 text-left font-semibold">
                W
              </th>
              <th scope="col" className="px-3 pb-2 text-left font-semibold">
                L
              </th>
              <th scope="col" className="px-3 pb-2 text-left font-semibold">
                PCT
              </th>
              <th scope="col" className="px-3 pb-2 text-left font-semibold">
                GB
              </th>
              <th
                scope="col"
                className="px-3 pb-2 text-left font-semibold hidden sm:table-cell"
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
                <td className="px-3 py-2">{team.teamName}</td>
                <td className="px-3 py-2">{team.wins}</td>
                <td className="px-3 py-2">{team.losses}</td>
                <td className="px-3 py-2">{team.winPercentage}</td>
                <td className="px-3 py-2">
                  {view === 'wildcard'
                    ? team.wildCardGamesBack
                    : team.gamesBack}
                </td>
                <td className="px-3 py-2 hidden sm:table-cell">
                  {team.streakAbbr}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ALStandings;
