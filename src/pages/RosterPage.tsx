import RosterTable from '../components/RosterTable';
import PlayerProfileModal from '../components/PlayerProfileModal';
import { useState } from 'react';

function RosterPage() {
  const [selectedPlayerID, setSelectedPlayerID] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectPlayer = (id: number) => {
    setSelectedPlayerID(id);
    setIsOpen(true);
  };

  return (
    <main className="bg-muted/5 w-full flex-1 p-4">
      <h1 className="sr-only">Roster Page</h1>
      {isOpen && (
        <PlayerProfileModal
          playerID={selectedPlayerID}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <RosterTable handleSelectPlayer={handleSelectPlayer} />
    </main>
  );
}

export default RosterPage;
