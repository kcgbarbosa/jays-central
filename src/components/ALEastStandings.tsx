import { useContext } from 'react';
import { StandingsContext } from '../store/contexts';

function ALEastStandings() {
  const standingsData = useContext(StandingsContext);

  const alEastTeams = standingsData.filter((team) => team.divisionId === 201);

  return (
    <div className="bg-background p-4 border border-border rounded-xl shadow-sm">
      <h2 className="text-base font-semibold text-primary pb-4">
        AL East Standings
      </h2>
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
              GB
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {alEastTeams.map((team) => (
            <tr key={team.teamId} className="text-sm text-primary">
              <td className="py-2">{team.teamName}</td>
              <td className="py-2">{team.wins}</td>
              <td className="py-2">{team.losses}</td>
              <td className="py-2">{team.gamesBack}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ALEastStandings;
