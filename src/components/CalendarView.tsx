/* import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
type Props = {
  events: any[];
};

function CalendarView({ events }: Props) {
  return (
    <div>
        <h3>Calendar</h3>
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        height="80vh"
        />
    </div>
  );
}

export default CalendarView;
*/

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import type { EventContentArg } from "@fullcalendar/core";
import { tagColors } from "../mockData";
import type { AppEvent } from "../types";

type Props = {
  events: AppEvent[];
  selectedMember: string;
};

function CalendarView({ events, selectedMember }: Props) {
  const visibleEvents = selectedMember
    ? events.filter((e) => e.memberName === selectedMember)
    : events;
  const calendarEvents = visibleEvents.map((e) => {
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

  return (
    <main className="calendar-panel">
      <div className="calendar-header">
        <h2 className="calendar-title">
          {selectedMember
            ? `${selectedMember}'s Schedule`
            : "All Assignments"}
        </h2>
        {selectedMember && (
          <span className="calendar-subtitle">
            Showing calendar for selected worker
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
