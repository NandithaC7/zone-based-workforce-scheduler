import { useState } from "react";
import Sidebar from "./components/Sidebar";
import CalendarView from "./components/CalendarView";
import type { AppEvent } from "./types";

// App is the ROOT component — it owns all the shared state and passes it
// down to child components as props. This is the standard React pattern called
// "lifting state up": if two sibling components need to share data, you move
// the state to their nearest common parent (here, App).
function App() {
  // selectedMember: which worker the user has clicked in the sidebar
  const [selectedMember, setSelectedMember] = useState<string>("");

  // events: the list of all scheduled assignments. Each event is shown as a
  // coloured block on the calendar. We store them in App so both the Sidebar
  // (which creates events) and CalendarView (which displays them) can access them.
  const [events, setEvents] = useState<AppEvent[]>([]);

  // addEvent is called by Sidebar when the user clicks "Add".
  // It builds a proper event object and appends it to the list.
  const addEvent = (
    resourceName: string,
    workload: "light" | "heavy",
    date: string,
    startTime: string,
    endTime: string
  ) => {
    if (!selectedMember || !date || !startTime || !endTime) return;

    // FullCalendar needs ISO datetime strings for timed events:
    // e.g. "2026-04-16T09:00:00"
    const newEvent: AppEvent = {
      id: `${Date.now()}`,
      title: `${selectedMember} — ${resourceName}`,
      start: `${date}T${startTime}:00`,
      end: `${date}T${endTime}:00`,
      workload,
      memberName: selectedMember,
      resourceName,
    };

    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <div className="app-layout">
      {/* LEFT PANEL — member picker + resource assignment form */}
      <Sidebar
        selectedMember={selectedMember}
        onSelectMember={setSelectedMember}
        onAddEvent={addEvent}
        events={events}
      />

      {/* RIGHT PANEL — the actual calendar grid */}
      <CalendarView events={events} selectedMember={selectedMember} />
    </div>
  );
}

export default App;
