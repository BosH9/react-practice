export default function Search({ value, onChange }) {
  return (
    <label>
      Search
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
