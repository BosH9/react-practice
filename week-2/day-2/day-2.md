1. Exercise 1 — Counter
Ans) Refer Counter.Jsx
2. Exercise 2 — Counter Step
Ans) Refer CounterStep.Jsx
3. Exercise 3 — Search
4. Exercise 4 — Active Filter
5. Exercise 5 — Toggle Status

Ans) for the above exercises(3,4,5) refer to UserDirectory.Jsx, UserCard.Jsx, UserList.Jsx, Search.Jsx files.

Q1) What is useState?
Explain what this means:
const [count, setCount] = useState(0);

Ans) useState is a fundamental React hook that lets functional components preserve local state across re-renders and trigger UI updates when that state changes.

when useState(0) is called, it returns an array with two values: the current state value and a function that updates the state value.
here count is the current state value and setCount is the function that updates the state value.

Q2) Why doesn't this work as expected?

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

Ans) The count variable isn't persistent React state.
Mutating a standard JavaScript variable (count++) happens silently in memory. It does not notify React to re-render the component, so the DOM remains unchanged on screen.

Even if a re-render occurred due to another trigger, let count = 0 executes every time the function runs, resetting count back to 0.

Q3) Predict the result:

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

Ans) After one click count will be 1.

Explanation:
User Event Trigger: When you click the element attached to handleClick, React initiates its event handling cycle.
Queueing Functional Updates (State Queue):React does not update state line-by-line or trigger immediate re-renders as each line executes. Instead, it places the updater functions into a pending update queue for this component.
1st call (setCount(count + 1)): Pushes Updater #1 into the queue.
2nd call (setCount(count + 1)): Pushes Updater #2 into the queue.
3rd call (setCount(count + 1)): Pushes Updater #3 into the queue.

Automatic Batching:React groups (batches) all state updates occurring within the same event handler into a single update cycle to avoid unnecessary UI thrashing.

Processing the Queue During Render:React begins the single re-render cycle and processes the queued functions sequentially, passing the result of each step to the next:

Initial State: 0
Updater #1: count is 0 returns 1
Updater #2: count is 0 returns 1
Updater #3: count is 1 returns 1
Final Calculated State: 1

Commit to DOM:React updates its internal state store to 1, computes the UI difference (reconciles), and commits the change to the actual browser DOM once.

Total Number of RendersTotal Renders = 1. Because of Automatic Batching, React waits until the event handler finishes executing before performing a single re-render with the final computed state (1).

Q4) Now:

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

Ans)

After one click count will be 3. 

Explanation: here prev is the current state value. as setCount(prev => prev + 1) is called three times, the current state value is updated three times. so the final state value is 3.

Q5) What's wrong with:

user.name = "Bob";

when user is state?

Ans) this will mutate the existing object. As react is depends on reference change for updating the state, the existing object update will not change any reference. So the react wont re-render the component.

Q6) How would you correctly update:

const [user, setUser] = useState({
    name: "John",
    age: 42
});

so the name becomes "Bob"?

Ans) using setUser updating method, we can update the existing object.

setUser({
    ...user,
    name: "Bob"
});

Q7) How would you remove user ID 5 from:

const [users, setUsers] = useState([...]);

without mutating the array?

Ans)

setUsers(users.filter(user => user.id !== 5));

Q8) Explain controlled input.

Why is this:

<input
    value={search}
    onChange={e => setSearch(e.target.value)}
/>

called a controlled component?

Ans)
A controlled input (or controlled component) in React is a form input element whose value is entirely driven and managed by React state, making that state the single source of truth.

The provided example is a controlled component for two reasons:

State Drives the View (value={search}): The rendered text inside the input box is strictly tied to the search state variable. Instead of the browser managing its own DOM value internally, React explicitly controls what is displayed on the screen at all times.

User Actions Drive State (onChange={e => setSearch(e.target.value)}): When a user types into the field, the browser's native event triggers the onChange handler, updating the React search state via setSearch(). Re-rendering the component with the new state updates the input's visual value.

This creates a one-way data flow loop:
User action → Triggers onChange → Updates React state → React re-renders input with new value.

Q9) What does lifting state up mean?

Give a practical example using:

SearchBox
UserList

Ans) 
Lifting state up means moving shared state to the closest common parent component so multiple child components can access and synchronize around the same data.

Instead of keeping state isolated inside a specific child component, the parent holds the state and passes it down via props, along with callback functions to update it.

Practical Example

In this setup, SearchBox needs to update the filter query, and UserList needs to display the filtered results based on that query. Since sibling components cannot pass props directly to each other, the searchQuery state is "lifted up" to the parent UserDirectory component.


import React, { useState } from 'react';

// 1. SearchBox receives the current value and the update handler via props
function SearchBox({ query, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search users..."
      value={query}
      onChange={e => onSearchChange(e.target.value)}
    />
  );
}

// 2. UserList receives the filtered list of users to display
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// 3. Parent Component holds the lifted state as the single source of truth
export default function UserDirectory() {
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];

  // Filter users based on the lifted searchQuery state
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SearchBox query={searchQuery} onSearchChange={setSearchQuery} />
      <UserList users={filteredUsers} />
    </div>
  );
}
Why it works:

SearchBox calls onSearchChange, updating searchQuery in UserDirectory.

UserDirectory re-renders and computes filteredUsers.

UserList receives the updated filteredUsers array and updates the rendered DOM list.

Q10) Why shouldn't you normally do this?

const [users, setUsers] = useState([]);
const [filteredUsers, setFilteredUsers] = useState([]);

when filteredUsers can be calculated from users and search?

Ans) 
Storing filteredUsers in state alongside users and search creates redundant state, which is an anti-pattern in React.

Here is why you should avoid doing this and how to structure it properly:

1. State Sync & Bug Risks
When a value can be derived directly from existing state or props, storing it in separate state requires keeping them synchronized manually. If users updates (e.g., a user is added) or search changes, you must remember to call both state updates simultaneously. Forgetting to update filteredUsers in every single place users or search mutates leads to stale UI bugs where the displayed list doesn't reflect the true data state.

2. Unnecessary Re-renders
Setting state triggers a component re-render. If you update users and then immediately update filteredUsers, you risk queuing multiple updates or causing unnecessary render cycles, leading to extra visual updates and lower performance.

3. Extra Complexity
It forces you to write extra useEffect blocks or imperative handler logic just to sync the state:

JavaScript
// ❌ Anti-pattern: Syncing derived state via useEffect
useEffect(() => {
  setFilteredUsers(users.filter(u => u.name.includes(search)));
}, [users, search]);
The Recommended Approach: Compute On-the-Fly
Instead of creating a state variable, calculate filteredUsers directly during rendering.

JavaScript
// ✅ Correct: Derived state calculated during render
const [users, setUsers] = useState([]);
const [search, setSearch] = useState('');

// Pure derived value — always guaranteed to be in sync!
const filteredUsers = users.filter(user =>
  user.name.toLowerCase().includes(search.toLowerCase())
);
What about performance?
If filtering a massive array (e.g., thousands of items) becomes an expensive calculation, wrap the computation in useMemo rather than creating a separate state:

JavaScript
const filteredUsers = useMemo(() => {
  return users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
}, [users, search]); // Only recomputes when users or search changes

?

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

Ans)
Output

Assuming count starts at 0 and the button is clicked once:

A: 0

B: 0

C: 0

Why? The Render Snapshot Concept

In React, state variables do not work like mutable JavaScript variables. Instead, every render of a component provides a "snapshot" of state and props for that specific render execution.

1. State is Frozen Within a Single Render
When Example renders with count = 0, React executes the function and creates a scope where count is constant and set to 0. The handleClick function created during this render "captures" this fixed value via a JavaScript closure.

2. setCount Does Not Mutate the Current Variable
Calling setCount(count + 1) tells React, "Schedule a re-render where count will be 1." It does not update the value of count inside the currently executing function scope.

Line A: Accesses count from the current snapshot → 0

Line B: Even though setCount was called right above it, count inside this function instance remains locked to the snapshot value → 0

Line C (Inside setTimeout): The setTimeout callback forms a closure over the exact same count variable from the initial render snapshot. Even though the timeout fires 1000ms later—after React has already re-rendered the component with count = 1—the delayed function execution still references the old snapshot where count was 0 → 0