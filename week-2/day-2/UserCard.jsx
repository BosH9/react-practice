export default function UserCard({ user, onViewProfile, onToggleUser }) {
  return (
    <div
      style={{
        textAlign: "left",
        border: "1px solid black",
        padding: "10px",
        margin: "10px auto",
        width: "500px",
      }}
    >
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <p>{user.isActive ? "🟢 Active" : "🔴 Inactive"}</p>
      <button type="button" onClick={() => onViewProfile(user)}>
        View Profile
      </button>
      <button type="button" onClick={() => onToggleUser(user.id)}>
        Toggle Status
      </button>
    </div>
  );
}
