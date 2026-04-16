import { workers } from "../mockData";
type Props = {
    onSelect: (name: string) => void;
};

function MemberSelector({ onSelect }: Props) {
    return (
        <div>
            <h3>Select Member</h3>
            <select onChange={(e) => onSelect(e.target.value)}>
                <option value="">--Select--</option>
                {workers.map((m) => (
                    <option key={m.id} value={m.name}>
                        {m.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default MemberSelector;
