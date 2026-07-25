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
    <main className="bg-background flex-1 w-full">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
        <header className="pb-8">
          <h1 className="text-4xl font-bold text-primary">Roster</h1>
          <p className="pt-2 text-muted">View the active 40 man roster.</p>
        </header>
        {isOpen && (
          <PlayerProfileModal
            playerID={selectedPlayerID}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
        <RosterTable handleSelectPlayer={handleSelectPlayer} />
      </div>
    </main>
  );
}

export default RosterPage;
