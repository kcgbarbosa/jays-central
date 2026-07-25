import ScheduleTable from '../components/ScheduleTable';

function SchedulePage() {
  return (
    <main className="bg-background flex-1 w-full">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
        <header className="pb-8">
          <h1 className="text-4xl font-bold text-primary">Schedule</h1>
          <p className="pt-2 text-muted">View games, past and present.</p>
        </header>
        <ScheduleTable />
      </div>
    </main>
  );
}

export default SchedulePage;
