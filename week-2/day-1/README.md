🛠️ Day 1 Project

We're going to build a small:

User Directory

Not a todo app yet. I want something that exercises component composition and props.

Your application should eventually look conceptually like:

┌──────────────────────────────────────────────┐
│              User Directory                  │
│                                              │
│ Search: [______________]                     │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ John Doe                                 │ │
│ │ john@example.com                         │ │
│ │ Frontend Developer                       │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ Alice Smith                              │ │
│ │ alice@example.com                        │ │
│ │ Product Manager                          │ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘

Today, don't implement search yet.

We're concentrating on component fundamentals.

🧩 Day 1 Exercise 1 — Basic Component

Create:

function UserCard() {
    // ...
}

It should render:

John Doe
john@example.com
Frontend Developer
🧩 Exercise 2 — Props

Change it to:

<UserCard
    name="John Doe"
    email="john@example.com"
    role="Frontend Developer"
/>

Your component should receive those values through props.

Don't hard-code the values inside UserCard.

🧩 Exercise 3 — Multiple Users

Create:

const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Frontend Developer"
    },
    {
        id: 2,
        name: "Alice Smith",
        email: "alice@example.com",
        role: "Product Manager"
    },
    {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "Backend Developer"
    }
];

Render them using:

.map()

and proper:

key={user.id}
🧩 Exercise 4 — Conditional Rendering

Add:

isActive: true

to each user.

Display:

🟢 Active

when active.

Otherwise:

🔴 Inactive

Use JSX conditional rendering.

Don't use a separate if statement inside JSX.

🧩 Exercise 5 — children

Create:

<Card>
    <h2>John Doe</h2>
    <p>Frontend Developer</p>
</Card>

Implement:

function Card({ children }) {
    // ...
}

The Card should render its children inside a styled container.

🧩 Exercise 6 — Event Handling

Add a button:

View Profile

When clicked:

console.log(user.id);

Use:

onClick

and do not execute the handler during render.

🔥 Senior Challenge

Create this component:

<UserList users={users} />

Requirements:

1. UserList owns no user data.

The data comes through props.

2. UserList renders UserCard.

Architecture:

App
 │
 └── UserList
       │
       ├── UserCard
       ├── UserCard
       └── UserCard
3. UserCard must receive the user through props.
4. UserCard must not modify the user.
5. Clicking "View Profile" should call a callback supplied by the parent.

For example:

<UserList
    users={users}
    onViewProfile={handleViewProfile}
/>

Then:

function handleViewProfile(user) {
    console.log("Selected:", user);
}

This is your first exposure to an extremely important React pattern:

Parent
   │
   ├── data ↓
   │
   └── callback ↓
         │
         ▼
       Child

We'll build heavily on this when we get to state.

🧪 Day 1 Knowledge Test

Don't look up the answers. Write your answers in your day-1.md.

Q1) What is JSX?

Explain the difference between JSX and HTML.

Q2) What happens conceptually when React sees:

<User name="John" />
Q3) What's the difference between:

onClick={handleClick}

and:

onClick={handleClick()}
Q4) Why does React need key when rendering lists?

Q5) Why is this potentially problematic?

users.map((user, index) => (
    <UserCard key={index} user={user} />
))

Q6) What is:

props.children

used for?

Q7) Why shouldn't you do this?

function UserList() {
    fetch("/api/users");


    return <div>Users</div>;
}

Q8 — Important

What's the difference between these?

<User name="John" />

and:

<User name={user.name} />

Q9 — Angular → React

In Angular you might write:

<app-user
    [user]="user"
    (selected)="handleSelected($event)">
</app-user>

How would you design the equivalent React component?

🎯 Day 1 Completion Criteria

Don't move to Day 2 until you can comfortably explain:

JSX
 ↓
Component
 ↓
Props
 ↓
Composition
 ↓
children
 ↓
Conditional rendering
 ↓
Lists + keys
 ↓
Events
 ↓
Pure rendering

And most importantly, you should be able to look at:

<UserList
    users={users}
    onViewProfile={handleViewProfile}
/>

and immediately understand:

users is data flowing down; onViewProfile is a function flowing down that allows the child to communicate an event back to the parent.

That parent-child data flow is one of the fundamental React concepts you'll use throughout the rest of this roadmap.

Your task

Implement the User Directory exercises + Senior Challenge and put your answers/code in:

week-2/day-1/day-1.md

Then send me the raw GitHub URL like you did for Week 1.

I'll review it with the same process: correctness → code quality → React mental model → Angular-to-React misconceptions → senior-level improvements → score, and I'll tell you exactly what you need to improve before Day 2.