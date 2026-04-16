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

      <select onChange={(e) => setResource(e.target.value)}>
        <option value="">Select Resource</option>
        {resources.map((r) => (
          <option key={r} value={r}>
            {r}
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