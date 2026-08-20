import UserCard from "./UserCard";

export default function UserList({ users, onViewProfile, onToggleUser }) {
  const list = users.map((user) => {
    return (
      <UserCard
        key={user.id}
        user={user}
        onViewProfile={onViewProfile}
        onToggleUser={onToggleUser}
      />
    );
  });
  return list;
}
