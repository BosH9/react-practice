import { useState } from "react";
import Search from "./Search.jsx";
import UserList from "./UserList.jsx";
export default function UserDirectory() {
  const initialUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Frontend Developer",
      isActive: true,
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice@example.com",
      role: "Product Manager",
      isActive: true,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Backend Developer",
      isActive: false,
    },
  ];
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(initialUsers);
  const [activeOnly, setActiveOnly] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      (!activeOnly || user.isActive) &&
      user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );

  function handleViewProfile(profile) {
    console.log("Profile", profile);
  }

  function onToggleUser(userId) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user,
      ),
    );
  }

  return (
    <>
      <h1>User Directory</h1>
      <Search value={search} onChange={setSearch} />
      <button type="button" onClick={() => setActiveOnly(true)}>
        Show Active Only
      </button>
      <button
        type="button"
        onClick={() => {
          setUsers(initialUsers);
          setActiveOnly(false);
          setSearch("");
        }}
      >
        Reset
      </button>
      <UserList
        users={filteredUsers}
        onViewProfile={handleViewProfile}
        onToggleUser={onToggleUser}
      />
    </>
  );
}
