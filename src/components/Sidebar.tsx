import { useState } from "react";
import { zones, teams, workers, resources, tagColors } from "../mockData";
import type { AppEvent } from "../types";

type Props = {
  selectedMember: string;
  onSelectMember: (name: string) => void;
  onAddEvent: (
    resourceName: string,
    workload: "light" | "heavy",
    date: string,
    startTime: string,
    endTime: string
  ) => void;
  events: AppEvent[];
  // New props for team view:
  teamView: boolean;
  onToggleTeamView: (on: boolean) => void;
  // When the team selection changes, we push the full list of member names
  // up to App so CalendarView can filter events without knowing about teams.
  onTeamMembersChange: (names: string[]) => void;
};

const timeSlots: string[] = [];
for (let h = 9; h <= 18; h++) {
  timeSlots.push(`${String(h).padStart(2, "0")}:00`);
  if (h < 18) timeSlots.push(`${String(h).padStart(2, "0")}:30`);
}

function Sidebar({
  selectedMember,
  onSelectMember,
  onAddEvent,
  events,
  teamView,
  onToggleTeamView,
  onTeamMembersChange,
}: Props) {
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedResource, setSelectedResource] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  const filteredTeams = selectedZone
    ? teams.filter((t) => t.zoneId === selectedZone)
    : [];

  const filteredWorkers = selectedTeam
    ? workers.filter((w) => w.teamId === selectedTeam)
    : [];

  // The display name of the currently selected team (used in the button label)
  const selectedTeamName = teams.find((t) => t.id === selectedTeam)?.name ?? "";

  const chosenResource = resources.find((r) => r.id === selectedResource);

  const memberEventsOnDate = events.filter(
    (e) => e.memberName === selectedMember && e.start.startsWith(date)
  );
  const memberStatus =
    memberEventsOnDate.length === 0
      ? "available"
      : memberEventsOnDate.length === 1
      ? "occupied"
      : "heavy";

  const handleAdd = () => {
    if (!chosenResource) return;
    onAddEvent(chosenResource.name, chosenResource.workload, date, startTime, endTime);
  };

  const handleZoneChange = (zoneId: string) => {
    setSelectedZone(zoneId);
    setSelectedTeam("");
    onSelectMember("");
    onTeamMembersChange([]);
    onToggleTeamView(false);
  };

  const handleTeamChange = (teamId: string) => {
    setSelectedTeam(teamId);
    onSelectMember("");
  
    const memberNames = workers
      .filter((w) => w.teamId === teamId)
      .map((w) => w.name);
    onTeamMembersChange(memberNames);
    onToggleTeamView(false);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Field Tracker</h1>
      </div>

      {/* ── ZONE → TEAM → MEMBER cascade ──────────────────────────────────── */}
      <section className="sidebar-section">
        <h2 className="section-label">Select Member</h2>

        <div className="field-group">
          <label className="field-label">Zone</label>
          <select
            className="field-select"
            value={selectedZone}
            onChange={(e) => handleZoneChange(e.target.value)}
          >
            <option value="">— Select Zone —</option>
            {zones.map((z) => (
              <option key={z.id} value={z.id}>{z.name}</option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label className="field-label">Team</label>
          <select
            className="field-select"
            value={selectedTeam}
            disabled={!selectedZone}
            onChange={(e) => handleTeamChange(e.target.value)}
          >
            <option value="">— Select Team —</option>
            {filteredTeams.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {selectedTeam && (
          <button
            className={`team-view-btn ${teamView ? "team-view-btn--active" : ""}`}
            onClick={() => onToggleTeamView(!teamView)}
          >
            {teamView
              ? `Viewing: ${selectedTeamName}`
              : `Team View — ${selectedTeamName}`}
          </button>
        )}

        <div className="field-group" style={{ marginTop: selectedTeam ? 10 : 0 }}>
          <label className="field-label">Worker</label>
          <select
            className="field-select"
            value={selectedMember}
            disabled={!selectedTeam}
            onChange={(e) => {
              onSelectMember(e.target.value);
              // Switching to a specific worker turns off team view automatically —
              // it would be confusing to have both active at once.
              if (e.target.value) onToggleTeamView(false);
            }}
          >
            <option value="">— Select Worker —</option>
            {filteredWorkers.map((w) => (
              <option key={w.id} value={w.name}>{w.name}</option>
            ))}
          </select>
        </div>

        {selectedMember && date && (
          <div className={`status-badge status-${memberStatus}`}>
            {memberStatus === "available" && "Available on this date"}
            {memberStatus === "occupied" && " Already has 1 assignment"}
            {memberStatus === "heavy" && "NO Has multiple tasks"}
          </div>
        )}
      </section>

      {/* ── ASSIGN RESOURCE ───────────────────────────────────────────────── */}
      <section className="sidebar-section">
        <h2 className="section-label">Assign Resource</h2>

        <div className="field-group">
          <label className="field-label">Resource</label>
          <select
            className="field-select"
            value={selectedResource}
            onChange={(e) => setSelectedResource(e.target.value)}
          >
            <option value="">— Select Resource —</option>
            {resources.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
          {chosenResource && (
            <span
              className="workload-tag"
              style={{ background: tagColors[chosenResource.workload] }}
            >
              {chosenResource.workload}
            </span>
          )}
        </div>

        <div className="field-group">
          <label className="field-label">Date</label>
          <input
            className="field-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="field-row">
          <div className="field-group half">
            <label className="field-label">From</label>
            <select
              className="field-select"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            >
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="field-group half">
            <label className="field-label">To</label>
            <select
              className="field-select"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            >
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="add-btn"
          onClick={handleAdd}
          disabled={!selectedMember || !chosenResource || !date}
        >
          + Add to Calendar
        </button>
      </section>

      {/* ──TAGS --- */}
      <section className="sidebar-section legend-section">
        <h2 className="section-label">Legend</h2>
        <div className="legend-items">
          {(["light", "heavy", "occupied"] as const).map((tag) => (
            <div key={tag} className="legend-item">
              <span className="legend-dot" style={{ background: tagColors[tag] }} />
              <span className="legend-label">
                {tag === "light" ? "Light work" : tag === "heavy" ? "Heavy work" : "Slot occupied"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

export default Sidebar;
