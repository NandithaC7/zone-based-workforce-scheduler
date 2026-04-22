import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import type { EventContentArg } from "@fullcalendar/core";
import { tagColors } from "../mockData";
import type { AppEvent } from "../types";

type Props = {
  events: AppEvent[];
  selectedMember: string;
  teamView: boolean;
  teamMemberNames: string[];
};

function CalendarView({ events, selectedMember, teamView, teamMemberNames }: Props) {
  const visibleEvents = teamView
    ? events.filter((e) => teamMemberNames.includes(e.memberName))
    : selectedMember
    ? events.filter((e) => e.memberName === selectedMember)
    : events;
  
  const calendarEvents = visibleEvents.map((e) => {
    // Check if there are overlapping events for the same start time
    const overlaps = visibleEvents.filter(
      (other) => other.start === e.start && other.id !== e.id
    ).length > 0;

    const color = overlaps
      ? tagColors.occupied
      : tagColors[e.workload];

    return {
      id: e.id,
      title: e.title,
      start: e.start,
      end: e.end,
      backgroundColor: color,
      borderColor: color,
      extendedProps: { workload: e.workload, resourceName: e.resourceName },
    };
  });

  // ── DYNAMIC HEADER ────────────────────────────────────────────────────────
  // Provides a clear, contextual title based on what data is being rendered
  const headerTitle = teamView
    ? ` Team View — ${teamMemberNames.length} workers`
    : selectedMember
    ? ` ${selectedMember}'s Schedule`
    : "All Assignments";

  const headerSub = teamView
    ? "Showing all assignments across the selected team"
    : selectedMember
    ? "Showing calendar for selected worker"
    : "";

  return (
    <main className="calendar-panel">
      <div className="calendar-header">
        <h2 className={`calendar-title ${teamView ? "calendar-title--team" : ""}`}>
          {headerTitle}
        </h2>
        {headerSub && (
          <span className="calendar-subtitle">
            {headerSub}
          </span>
        )}
      </div>

      <div className="calendar-wrap">
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin]}
          initialView="timeGridWeek"
          slotMinTime="09:00:00"
          slotMaxTime="18:00:00"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridDay,timeGridWeek,dayGridMonth",
          }}
          events={calendarEvents}
          height="calc(100vh - 100px)"
          slotDuration="00:30:00"
          
          eventContent={(arg: EventContentArg) => (
            <div className="fc-event-inner">
              <span className="fc-event-title-text">{arg.event.title}</span>
              <span
                className="fc-event-tag"
                style={{
                  background: arg.event.backgroundColor,
                  filter: "brightness(1.3)",
                }}
              >
                {arg.event.extendedProps.workload}
              </span>
            </div>
          )}
        />
      </div>
    </main>
  );
}

export default CalendarView;
