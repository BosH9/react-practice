Q1) What is JSX?

Ans: JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.


Under the Hood,JSX Compiles to JavaScript objects (React.createElement or JSX runtime calls). HTML Parsed directly by the browser to build the DOM.
Logic & Expressions,JSX Embeds dynamic JavaScript expressions directly using {} syntax. HTML Static markup; requires external JavaScript/DOM manipulation.
Attribute Naming,"Uses camelCase (e.g., className, htmlFor, onClick). HTML Uses standard HTML attributes (e.g., class, for, onclick)."
Closing Tags,JSX "Strict; every element must be explicitly closed (e.g., <img />, <br />). HTML Forgiving with self-closing/void tags (e.g., <img>, <br>)."
Component Support,JSX Renders custom UI components (<UserCard/>) alongside DOM elements. HTML Renders only standard HTML tags natively.

Q2) What happens conceptually when React sees:

<User name="John" />

Ans: React sees the <User /> tag and creates a React element. React then calls the User component to render the HTML.

When React encounters <User name="John"/>, it executes a multi-step process to transform that JSX tag into visual DOM nodes:

1. Compilation to JavaScript Object Creation
The JSX compiler (Babel or SWC) converts the markup into a function call. Under the hood, <User name="John"/> is transformed into:

Modern React: jsx(User, { name: "John" })

Older React: React.createElement(User, { name: "John" })

Executing this call produces a plain JavaScript object (a React Element) representing the component descriptor:

JavaScript
{
  $$typeof: Symbol.for('react.element'),
  type: User,
  props: { name: "John" },
  key: null,
  ref: null
}
2. Component Execution (Render Phase)
During the render phase, React sees that type is a function (User). Instead of creating a DOM element directly, it calls the User component function, passing { name: "John" } as the first argument (props).

3. Recursive Resolution
The User function returns its own JSX tree (e.g., <div className="card"><h1>John</h1></div>). React recursively evaluates this output down the tree until it gets a tree made entirely of primitive HTML/DOM tags (like div, h1, p).

4. Virtual DOM & Reconciliation
React compares this newly generated tree of elements against the previously rendered Virtual DOM tree using its reconciliation algorithm (Fiber) to compute the minimal set of changes required.

5. Commit Phase
React applies the calculated changes to the browser's real DOM (creating, updating, or deleting real DOM nodes) so the user sees the updated interface.


Q3) What's the difference between:

onClick={handleClick}

and:

onClick={handleClick()}

Ans: The key difference lies in whether you are passing a function reference to React or executing the function immediately during render.

onClick={handleClick} execution timing Delayed (only when the user clicks the element) as react receives A reference to the handleClick function.
onClick={handleClick()} execution timing Immediate (when the element is rendered) as react executes the handleClick function immediately.


Q4) Why does React need 'key' when rendering lists?
Ans: React needs 'key' when rendering lists because it helps React identify which items have changed, are added, or are removed.

Q5) Why is this potentially problematic?

users.map((user, index) => (
    <UserCard key={index} user={user} />
))
Ans:
Causes React to re-render the entire list every time, which can be expensive for large lists. So it degrades the rendering performance. Also state & ui bugs during the mutation.

Q6) What is props.children used for?
Ans: props.children is a special prop in React used to pass UI elements or components directly into a child component as content, enabling component composition

Q7) Why shouldn't you do this?

function UserList() {
    fetch("/api/users");
    return <div>Users</div>;
}
Ans:
React components re-renders multiple times for various reasons. so the network call is made multiple times. So the performance is degraded.

Q8 — What's the difference between these?

<User name="John" /> and: <User name={user.name} />

Ans: First one is passing hard coded value, second one is passing dynamic value.

Q9 — Angular → React

In Angular you might write:

<app-user
    [user]="user"
    (selected)="handleSelected($event)">
</app-user>

How would you design the equivalent React component?
Ans: <User user={user} onSelected={handleSelected} />


User Directory exercises + Senior Challenge

export default function Search() {
  return (
    <label>
      Search
      <input type="text" placeholder="Search..." />
    </label>
  );
}

export default function UserCard({
  name,
  email,
  role,
  isActive,
  onViewProfile,
}) {
  return (
    <div
      style={{
        "text-align": "left",
        border: "1px solid black",
        padding: "10px",
        margin: "10px auto",
        width: "500px",
      }}
    >
      <p>{name}</p>
      <p>{email}</p>
      <p>{role}</p>
      <p>{isActive ? "🟢 Active" : "🔴 Inactive"}</p>
      <button type="button" onClick={onViewProfile}>
        View Profile
      </button>
    </div>
  );
}

import UserCard from "./UserCard";

export default function UserList({ users, onViewProfile }) {
  const list = users.map((user) => {
    return (
      <UserCard
        name={user.name}
        email={user.email}
        role={user.role}
        key={user.id}
        isActive={user.isActive}
        onViewProfile={() => onViewProfile(user)}
      />
    );
  });
  return list;
}

import Search from "./Search.jsx";
import UserList from "./UserList.jsx";
export default function UserDirectory() {
  const users = [
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

  function handleViewProfile(profile) {
    console.log("Profile", profile);
  }

  return (
    <>
      <h1>User Directory</h1>
      <Search />
      <UserList users={users} onViewProfile={handleViewProfile} />
    </>
  );
}
