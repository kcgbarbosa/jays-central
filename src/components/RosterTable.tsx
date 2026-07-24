import { useContext, useMemo, useState } from 'react';
import { PlayerContext } from '../store/contexts';
import SortButton, { type RosterFilterType } from './SortButton';
import { motion } from 'motion/react';
import { filterPlayersBySearch } from '../utils/rosterSearchUtils';

type RosterProps = {
  handleSelectPlayer: (id: number) => void;
};

const toInches = (h: string) => {
  const [ft, ins] = h.replace('"', '').split("' ").map(Number);
  return ft * 12 + ins;
};

const POSITION_GROUPS: { label: string; positionType: string | null }[] = [
  { label: 'All', positionType: null },
  { label: 'Pitchers', positionType: 'Pitcher' },
  { label: 'Catchers', positionType: 'Catcher' },
  { label: 'Infield', positionType: 'Infielder' },
  { label: 'Outfield', positionType: 'Outfielder' },
];

function RosterTable({ handleSelectPlayer }: RosterProps) {
  const playerData = useContext(PlayerContext);
  const [rosterFilter, setRosterFilter] =
    useState<RosterFilterType>('lastNameAToZ');
  const [searchQuery, setSearchQuery] = useState('');
  const [positionType, setPositionType] = useState<string | null>(null);

  const filteredRoster = useMemo(() => {
    const searched = filterPlayersBySearch(playerData, searchQuery);
    const byPosition = positionType
      ? searched.filter((p) => p.positionType === positionType)
      : searched;
    const sorted = [...byPosition];
    switch (rosterFilter) {
      case 'firstNameAToZ':
        return sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
      case 'firstNameZToA':
        return sorted.sort((a, b) => b.firstName.localeCompare(a.firstName));
      case 'lastNameAToZ':
        return sorted.sort((a, b) => a.lastName.localeCompare(b.lastName));
      case 'lastNameZToA':
        return sorted.sort((a, b) => b.lastName.localeCompare(a.lastName));
      case 'positionAToZ':
        return sorted.sort((a, b) =>
          a.positionName.localeCompare(b.positionName)
        );
      case 'positionZToA':
        return sorted.sort((a, b) =>
          b.positionName.localeCompare(a.positionName)
        );
      case 'batSideAToZ':
        return sorted.sort((a, b) =>
          a.batSideCode.localeCompare(b.batSideCode)
        );
      case 'batSideZToA':
        return sorted.sort((a, b) =>
          b.batSideCode.localeCompare(a.batSideCode)
        );
      case 'ageAsc':
        return sorted.sort((a, b) => a.currentAge - b.currentAge);
      case 'ageDesc':
        return sorted.sort((a, b) => b.currentAge - a.currentAge);
      case 'heightAsc':
        return sorted.sort((a, b) => toInches(a.height) - toInches(b.height));
      case 'heightDesc':
        return sorted.sort((a, b) => toInches(b.height) - toInches(a.height));
      case 'weightAsc':
        return sorted.sort((a, b) => a.weight - b.weight);
      case 'weightDesc':
        return sorted.sort((a, b) => b.weight - a.weight);
      default:
        return sorted;
    }
  }, [playerData, rosterFilter, searchQuery, positionType]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05, // 50ms between each child
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleSelectPlayer(id);
    }
  };
  return (
    <div className="sm:py-8 sm:px-4 sm:max-w-7xl sm:mx-auto">
      <h1 className="hidden sm:block text-xl font-bold text-primary mb-4 uppercase tracking-widest px-4 sm:px-0">
        Current Roster
      </h1>
      <div className="px-4 sm:px-0 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {POSITION_GROUPS.map((group) => (
            <button
              key={group.label}
              onClick={() => setPositionType(group.positionType)}
              className={`px-3 py-1 border text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                positionType === group.positionType
                  ? 'bg-primary text-white border-primary'
                  : 'border-border text-muted hover:border-primary hover:text-primary'
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search players..."
          aria-label="Search players"
          className="w-full sm:w-64 px-3 py-2 text-sm rounded border border-border bg-background text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>
      {playerData.length === 0 ? (
        <div>No roster data available.</div>
      ) : filteredRoster.length === 0 ? (
        <div className="px-4 sm:px-0 text-muted text-sm">
          No players match your search.
        </div>
      ) : (
        <div className="-mx-4 sm:mx-0 border-y sm:border border-border sm:rounded-xl shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-primary text-white tracking-wide uppercase text-xs">
              <tr>
                <th className="text-left px-4 py-3">Player</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">
                  Position
                </th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">
                  <SortButton
                    label="B/T"
                    asc="batSideAToZ"
                    desc="batSideZToA"
                    activeFilter={rosterFilter}
                    onSelect={setRosterFilter}
                  />
                </th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">
                  <SortButton
                    label="Age"
                    asc="ageAsc"
                    desc="ageDesc"
                    activeFilter={rosterFilter}
                    onSelect={setRosterFilter}
                  />
                </th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">
                  <SortButton
                    label="HT"
                    asc="heightAsc"
                    desc="heightDesc"
                    activeFilter={rosterFilter}
                    onSelect={setRosterFilter}
                  />
                </th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">
                  <SortButton
                    label="WT"
                    asc="weightAsc"
                    desc="weightDesc"
                    activeFilter={rosterFilter}
                    onSelect={setRosterFilter}
                  />
                </th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="divide-y divide-border bg-background"
            >
              {filteredRoster.map((player) => {
                return (
                  <motion.tr
                    tabIndex={0}
                    aria-label={`View ${player.fullName}s full details`}
                    onKeyDown={(e) => handleKeyDown(e, player.id)}
                    whileHover={{ scale: 1.01 }}
                    variants={rowVariants}
                    key={player.id}
                    className="hover:bg-primary/5 transition-colors duration-150 cursor-pointer"
                    onClick={() => handleSelectPlayer(player.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 ">
                        <img
                          src={player.playerHeadshotUrl}
                          alt={player.fullName}
                          className="h-8 w-8 rounded-full object-cover bg-muted/15"
                        />
                        <div>
                          <div className="font-medium text-primary">
                            {player.fullName}
                          </div>
                          <div className="text-xs text-accent">
                            #{player.jerseyNumber}
                          </div>
                          <div className="lg:hidden flex gap-4 mt-1 text-xs text-muted">
                            <span>{player.positionAbbreviation}</span>
                            <span>
                              {player.batSideCode}/{player.pitchHandCode}
                            </span>
                            <span>{player.currentAge}y</span>
                            <span>{player.height}</span>
                            <span>{player.weight} lbs</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-muted hidden lg:table-cell">
                      {player.positionName} / {player.positionAbbreviation}
                    </td>
                    <td className="px-4 py-2.5 text-muted hidden lg:table-cell">
                      {player.batSideCode}/{player.pitchHandCode}
                    </td>
                    <td className="px-4 py-2.5 text-muted hidden lg:table-cell">
                      {player.currentAge}
                    </td>
                    <td className="px-4 py-2.5 text-muted hidden lg:table-cell">
                      {player.height}
                    </td>
                    <td className="px-4 py-2.5 text-muted hidden lg:table-cell">
                      {player.weight} lbs
                    </td>
                  </motion.tr>
                );
              })}
            </motion.tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RosterTable;
