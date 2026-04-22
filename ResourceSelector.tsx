/*
import { useState } from "react";
import { resources } from "../mockData";

type Props = {
  onAdd: (resource: string, date: string) => void;
};

function ResourceSelector({ onAdd }: Props) {
  const [resource, setResource] = useState("");
  const [date, setDate] = useState("");

  return (
    <div>
      <h3>Assign Resource</h3>
      <label htmlFor="resource-select">Resource</label>
      <select
        id="resource-select"
        onChange={(e) => setResource(e.target.value)}
      >
      <select onChange={(e) => setResource(e.target.value)}>
        <option value="">Select Resource</option>
        {resources.map((r) => (
          <option key={r} value={r}>
      <label htmlFor="resource-date">Assignment Date</label>
      <input
        id="resource-date"
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />
          </option>
        ))}
      </select>

      <input type="date" onChange={(e) => setDate(e.target.value)} />

      <button onClick={() => onAdd(resource, date)}>
        Add
      </button>
    </div>
  );
}

export default ResourceSelector;
*/