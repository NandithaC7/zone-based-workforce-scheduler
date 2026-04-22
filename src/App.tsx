import { useState } from "react";
import Sidebar from "./components/Sidebar";
import CalendarView from "./components/CalendarView";
import type { AppEvent } from "./types";

function App() {
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [events, setEvents] = useState<AppEvent[]>([]);

  // teamView: when true, the calendar shows ALL workers in the selected team
  // instead of just the one selected worker.
  // We lift this state to App because BOTH Sidebar (the button that flips it)
  // and CalendarView (which uses it to filter events) need access to it.
  const [teamView, setTeamView] = useState(false);

  // teamMemberNames: the list of worker names belonging to the selected team.
  // When the user switches teams or clears the selection, Sidebar tells App
  // what names are in the current team so CalendarView can filter on them.
  const [teamMemberNames, setTeamMemberNames] = useState<string[]>([]);

  const addEvent = (
    resourceName: string,
    workload: "light" | "heavy",
    date: string,
    startTime: string,
    endTime: string
  ) => {
    if (!selectedMember || !date || !startTime || !endTime) return;
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
      <Sidebar
        selectedMember={selectedMember}
        onSelectMember={setSelectedMember}
        onAddEvent={addEvent}
        events={events}
        teamView={teamView}
        onToggleTeamView={setTeamView}
        onTeamMembersChange={setTeamMemberNames}
      />
      <CalendarView
        events={events}
        selectedMember={selectedMember}
        teamView={teamView}
        teamMemberNames={teamMemberNames}
      />
    </div>
  );
}

export default App;
