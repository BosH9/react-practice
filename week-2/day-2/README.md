Week 2 — Day 2: useState, State, and React Rendering

Today is one of the most important days in your React journey.

You already understand components, props, JSX, events, and component composition. Now we introduce the thing that makes React applications interactive:

State

Because you're coming from Angular, I'll deliberately spend time on the differences between Angular component properties and React state.

🎯 Day 2 Goals

By the end of today, you should understand:

What state is
useState
State initialization
State updates
Why state updates trigger rendering
Why state updates are asynchronous/batched from your perspective
Functional state updates
Updating objects in state
Updating arrays in state
State vs props
Controlled inputs
Lifting state up
Why you shouldn't mutate state
Common useState mistakes

And you'll build a functional User Directory.

Part 1 — The Core Mental Model

Yesterday:

Props
  ↓
Component
  ↓
JSX
  ↓
UI

Today:

        Props
          │
          ▼
      Component
          ▲
          │
        State
          │
          ▼
         JSX
          │
          ▼
          UI

The important idea:

When state changes, React renders the component again using the new state.

For example:

function Counter() {
    const [count, setCount] = useState(0);


    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}

Initial render:

count = 0

UI:

0

Click:

setCount(1)

React renders again:

count = 1

UI becomes:

1
Part 2 — What Is useState?

The basic syntax:

const [count, setCount] = useState(0);

There are three concepts here:

        useState(0)
            │
       ┌────┴────┐
       ▼         ▼
    current    updater
     value     function
       │         │
     count    setCount

So:

count

is the current state value.

And:

setCount

is how you request a state update.

Angular Comparison

In Angular you might have:

count = 0;


increment() {
    this.count++;
}

React:

const [count, setCount] = useState(0);


function increment() {
    setCount(count + 1);
}

But don't conclude that React state is simply an Angular class property with different syntax.

React state has a different lifecycle and update model.

Part 3 — State Is Preserved Between Renders

Consider:

function Counter() {
    const [count, setCount] = useState(0);


    console.log("render");


    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}

Click three times.

You'll see:

render
render
render
render

But the state progresses:

0
1
2
3

React preserves the state between renders.

This is one of the fundamental things useState provides.

Part 4 — A Render Is Not a Function Call That Resets Everything

This is a common beginner misconception.

You might think:

function Counter() {
    let count = 0;
}

and:

function Counter() {
    const [count, setCount] = useState(0);
}

are similar.

They aren't.

With:

let count = 0;

every render executes:

function starts
     ↓
count = 0

again.

So this won't work:

function Counter() {
    let count = 0;


    function increment() {
        count++;
    }


    return (
        <button onClick={increment}>
            {count}
        </button>
    );
}

The variable isn't persistent React state.

Part 5 — State Updates Trigger Rendering

Consider:

const [count, setCount] = useState(0);

Calling:

setCount(10);

doesn't mean:

"Change this JavaScript variable immediately."

Think of it as:

"React, please update this state and render this component with the new value."

Conceptually:

setCount(10)
     ↓
React schedules update
     ↓
component renders again
     ↓
count = 10
     ↓
new JSX
     ↓
React reconciles
     ↓
DOM update
Part 6 — The Classic State Update Trap

Look at this:

function Counter() {
    const [count, setCount] = useState(0);


    function handleClick() {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    }


    return <button onClick={handleClick}>{count}</button>;
}

What do you expect?

You might expect:

3

But you'll get:

1

Why?

Because during this event handler:

count

represents the value from the current render.

If:

count = 0

all three statements effectively request:

setCount(1)
setCount(1)
setCount(1)

React batches the updates.

Part 7 — Functional State Updates

When the next state depends on the previous state, use:

setCount(prev => prev + 1);

So:

function handleClick() {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
}

Now:

initial = 0


update 1 → 1
update 2 → 2
update 3 → 3

Final:

3

This pattern is extremely important.

Memorize this rule:

If the next state depends on the previous state, prefer the functional updater.

Part 8 — Why Does This Work?

React maintains an update queue.

Conceptually:

setCount(prev => prev + 1)
setCount(prev => prev + 1)
setCount(prev => prev + 1)

becomes:

0
 ↓
+1
 ↓
+1
 ↓
+1
 ↓
3

Whereas:

setCount(count + 1);
setCount(count + 1);
setCount(count + 1);

with:

count = 0

produces three updates based on the same snapshot:

setCount(1)
setCount(1)
setCount(1)
Part 9 — State Is a Snapshot

This is one of the most important React concepts.

Suppose:

function Counter() {
    const [count, setCount] = useState(0);


    function handleClick() {
        setCount(count + 1);


        console.log(count);
    }


    return <button onClick={handleClick}>{count}</button>;
}

What does the console show?

If the current render has:

count = 0

then:

setCount(count + 1);
console.log(count);

prints:

0

not:

1

Why?

Because the count variable belongs to the current render's snapshot.

The update affects the next render.

This concept will become extremely important when we study:

closures
effects
stale state
async operations
event handlers
Part 10 — Updating Objects in State

Suppose:

const [user, setUser] = useState({
    name: "John",
    age: 42
});

Don't do:

user.name = "Bob";

This mutates the existing object.

Instead:

setUser({
    ...user,
    name: "Bob"
});

You create a new object.

Conceptually:

Old object
   ↓
{name: John, age: 42}


        ↓ spread


New object
   ↓
{name: Bob, age: 42}
Part 11 — Why Immutability Matters

React relies heavily on reference identity.

For example:

const oldUser = {
    name: "John"
};

Then:

oldUser.name = "Bob";

The reference is still:

oldUser ───────► same object

But:

const newUser = {
    ...oldUser,
    name: "Bob"
};

creates:

oldUser ───────► old object


newUser ───────► new object

This makes changes easier for React and your application logic to reason about.

Part 12 — Updating Arrays in State

Suppose:

const [users, setUsers] = useState([]);
Add
setUsers(prev => [
    ...prev,
    newUser
]);
Remove
setUsers(prev =>
    prev.filter(user => user.id !== id)
);
Update
setUsers(prev =>
    prev.map(user =>
        user.id === id
            ? { ...user, isActive: !user.isActive }
            : user
    )
);

Notice the pattern:

Don't mutate
     ↓
Create new array
     ↓
Create new object where necessary
Part 13 — Controlled Inputs

Now we connect state to forms.

function SearchBox() {
    const [search, setSearch] = useState("");


    return (
        <input
            value={search}
            onChange={event => setSearch(event.target.value)}
        />
    );
}

The flow is:

User types "Jo"
       ↓
onChange
       ↓
setSearch("Jo")
       ↓
render
       ↓
value="Jo"

The React state is the source of truth.

This is called a:

Controlled Component
Angular Comparison

Angular template-driven/forms might have:

<input [(ngModel)]="search">

React's equivalent conceptually is:

<input
    value={search}
    onChange={e => setSearch(e.target.value)}
/>

React makes the data flow explicit:

state → input value
input event → state update
Part 14 — Lifting State Up

Suppose:

UserDirectory
├── SearchBox
└── UserList

Who should own the search state?

Not necessarily SearchBox.

Because UserList also needs the search value.

So move the state to their closest common parent:

UserDirectory
     │
     ├── search state
     │
     ├── SearchBox
     │
     └── UserList

Then:

UserDirectory
   │
   ├── search → SearchBox
   │
   └── filteredUsers → UserList

This is called:

Lifting State Up

It's a fundamental React architecture pattern.

🏗️ Day 2 Project

We're going to upgrade yesterday's User Directory.

Yesterday:

User Directory
     │
     ├── Search
     └── UserList
           └── UserCard

Today:

User Directory
     │
     ├── search state
     │
     ├── SearchBox
     │
     └── UserList
           └── UserCard
Exercise 1 — Counter

Create:

function Counter() {
    // state
}

Requirements:

+ button
- button
Reset button

Example:

Count: 5


[-] [+] [Reset]

Implement:

+ → increment
- → decrement
Reset → 0
Important

Implement increment/decrement using functional updates:

setCount(prev => prev + 1);

and:

setCount(prev => prev - 1);
Exercise 2 — Counter Step

Add:

Step: [5]

Then:

+ → count + step
- → count - step

For example:

Count: 10
Step: 5


[-] [+]

Click +:

15

Click again:

20

This will exercise state + controlled inputs.

Exercise 3 — User Search

Take your Week 2 Day 1 User Directory.

Add:

const [search, setSearch] = useState("");

Create:

<SearchBox
    value={search}
    onChange={setSearch}
/>

Then filter users.

For example:

Search: "john"

should display only users whose name contains "john".

Make the search case-insensitive.

Hint:

user.name.toLowerCase()

and:

search.toLowerCase()
Exercise 4 — Active Users Filter

Add a button:

[Show Active Only]

State:

const [activeOnly, setActiveOnly] = useState(false);

When false:

All users

When true:

Only active users
Exercise 5 — Toggle User Status

Inside UserCard:

John Doe
🟢 Active


[Toggle Status]

Click:

🔴 Inactive

Click again:

🟢 Active
Important architectural requirement

UserCard should not own the users array.

The parent owns:

const [users, setUsers] = useState(...)

and passes the required callback down.

Think:

UserDirectory
     │
     │ users
     ▼
UserList
     │
     │ user + callback
     ▼
UserCard
     │
     │ onToggle()
     ▼
UserDirectory
     │
     │ setUsers(...)
     ▼
render

This is your first real exercise in lifting state and unidirectional data flow.

🔥 Senior Challenge — User Directory State Architecture

Implement:

┌──────────────────────────────────────────────┐
│ User Directory                               │
│                                              │
│ Search: [____________]                       │
│                                              │
│ [All] [Active]                               │
│                                              │
│ John Doe              🟢 Active              │
│ [Toggle] [View]                             │
│                                              │
│ Alice Smith            🔴 Inactive           │
│ [Toggle] [View]                             │
└──────────────────────────────────────────────┘
Requirements

State should live in UserDirectory:

users
search
activeOnly

You should not put these pieces of state into individual UserCard components.

Filtering

You should derive:

filteredUsers

from:

users
search
activeOnly

Conceptually:

users
   │
   ├── search
   │
   └── activeOnly
          ↓
    filteredUsers
          ↓
      UserList

Don't create a fourth piece of state:

const [filteredUsers, setFilteredUsers] = useState(...)

for this exercise.

Why?

Because filteredUsers is derived data.

We'll later discuss this principle in much more depth.

🧠 Day 2 Interview Questions

Put your answers in your day-2.md.

Q1

What is useState?

Explain what this means:

const [count, setCount] = useState(0);
Q2

Why doesn't this work as expected?

function Counter() {
    let count = 0;


    function increment() {
        count++;
    }


    return (
        <button onClick={increment}>
            {count}
        </button>
    );
}
Q3

Predict the result:

function Counter() {
    const [count, setCount] = useState(0);


    function handleClick() {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    }


    return <button onClick={handleClick}>{count}</button>;
}

What happens after one click?

Explain why.

Q4

Now:

function Counter() {
    const [count, setCount] = useState(0);


    function handleClick() {
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
    }


    return <button onClick={handleClick}>{count}</button>;
}

What happens after one click?

Why is this different?

Q5

What's wrong with:

user.name = "Bob";

when user is state?

Q6

How would you correctly update:

const [user, setUser] = useState({
    name: "John",
    age: 42
});

so the name becomes "Bob"?

Q7

How would you remove user ID 5 from:

const [users, setUsers] = useState([...]);

without mutating the array?

Q8

Explain controlled input.

Why is this:

<input
    value={search}
    onChange={e => setSearch(e.target.value)}
/>

called a controlled component?

Q9

What does lifting state up mean?

Give a practical example using:

SearchBox
UserList
Q10 — Senior Question

Why shouldn't you normally do this?

const [users, setUsers] = useState([]);
const [filteredUsers, setFilteredUsers] = useState([]);

when filteredUsers can be calculated from users and search?

🔥 Senior Challenge Question

Predict the output:

function Example() {
    const [count, setCount] = useState(0);


    function handleClick() {
        console.log("A:", count);


        setCount(count + 1);


        console.log("B:", count);


        setTimeout(() => {
            console.log("C:", count);
        }, 1000);
    }


    return (
        <button onClick={handleClick}>
            {count}
        </button>
    );
}

Starting from:

count = 0

After clicking once, what will:

A
B
C

print?

And why?

Don't just give the numbers. Explain it using the concept of a render snapshot.

This question is deliberately important because it connects today's useState lesson with the closures you learned during Week 1.

📌 Day 2 Rules

For today's implementation:

Don't use:
Redux
Zustand
Jotai
Context
useReducer
useMemo
useCallback
useEffect

We're deliberately keeping the problem small.

You need to become extremely comfortable with:

useState
   ↓
event
   ↓
setState
   ↓
render
   ↓
new UI

before introducing more abstractions.

Your Day 2 Deliverable

Create:

week-2/
└── day-2/
    └── day-2.md

Include:

1. Exercise 1 — Counter
2. Exercise 2 — Counter Step
3. Exercise 3 — Search
4. Exercise 4 — Active Filter
5. Exercise 5 — Toggle Status
6. Senior Challenge — User Directory
7. Q1-Q10 answers
8. Senior Challenge Question answer

For the code exercises, you can either include the relevant code directly in day-2.md or link to the source files in your repository.

When you're done, send me the raw GitHub URL.

I'll evaluate it like Day 1, but this time I'll pay particular attention to:

state ownership → immutability → functional updates → controlled inputs → derived state → lifting state → render snapshots → stale closures.