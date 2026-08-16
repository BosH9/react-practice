1) Answers to Exercises 1–5 with explanations.

// Exercise 1

// Output

A
C
B

Explanation:

The first line of code logs "A" to the console. As setTimeout is a macro task, it wait for the next iteration of the event loop to execute. then logs "C" to the console. And the call stack is empty, it pulls the task from the task queue and logs "B" to the console.


// Exercise 2

// Output

1
3
2

Explanation:
The first line of code logs "1" to the console as it synchronous. As Promise is a micro task, it pushes into microtask queue and wait for the next iteration of the event loop to execute. then logs "3" to the console. And the call stack is empty, it pulls the task from the task queue and logs "2" to the console.


// Exercise 3

// Output

Start
End
Promise
Timeout

Explanation:
First executes the first line of code, logs "Start" to the console.
Next As setTimeout is a macro task, it wait for the next iteration of the event loop to execute.
Then Promise is a micro task, it pushes into microtask queue and wait for the next iteration of the event loop to execute.
then logs "End" to the console. And the call stack is empty, it pulls the task from the Microtask queue and logs "Promise" to the console.
Then, it pulls the task from the Macrotask queue and logs "Timeout" to the console.


// Exercise 4

// Output

3
1
4
2

Explanation:
First executes the first line of code, logs "3" to the console. calls test(), then logs "1" to the console. then await makes it wait for to resolve the promise, it logs "4" to the console. then, comes back to the main thread and it logs "2" to the console.


// Exercise 5

// Output

1
5
2
4
3

Explanation:
First logs "1" to the console. next is the promise, it waits to resolve then logs "5" to the console. then come back to promise then logs "2" to the console.
Next is setTimeout, pushes to the macrotask queue and waits for the next iteration of the event loop to execute. then promise is pushed to microtask queue. first executes from microtask queue, logs "4" to the console. then comes back to main thread, pulls from macrotask queue and logs "3" to the console.



2) createScheduler() implementation.

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function createScheduler() {
  let tasks = [];

  function add(fxn) {
    const normalizedTask = async () => {
      return fxn();
    };
    tasks.push(normalizedTask);
  }

  async function run() {
    for (const task of tasks) {
      try {
        await task();
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  return {
    add,
    run,
  };
}

const scheduler = createScheduler();

scheduler.add(() => console.log("Task 1"));
scheduler.add(() => {
  return delay(3000).then(()=> console.log('3 seconds passed'))
});
scheduler.add(() => {
  throw new Error('error');
});
scheduler.add(() => console.log('Task 3'));

scheduler.run();

3) retry() implementation.

let attempts = 0;
let newDelay = 1000;

async function fetchUser() {
    attempts++;

    if (attempts <= 3) {
        throw new Error("Network Error");
    }

    return {
        id: 1,
        name: "John"
    };

    // throw new Error("Final Error");
}

async function retry(fnc, { retries, delay }) {

    try{
        return await fnc();
        
    }
    catch(e) {
        console.log('retries', retries);
        if(retries === 0) {
            throw e;
        }
        retries--;
        newDelay *= 2;
        console.log('delay', newDelay/1000, 'seconds');

        console.log(e.message);
        return new Promise(resolve => setTimeout(() => resolve(retry(fnc, {retries, delay})), newDelay));
        
    }
   
}

const result = await retry(fetchUser, {
    retries: 3,
    delay: 1000
});

console.log(result);

4) Answers to the React scenario.

await only freeze the execution of the current function. while the rest of the code is still running. if saveUser rejects the function will crash at that line, and setLoading(false) will never run. This leaves your UI stuck in a permanent loading state. we use try/catch around await saveUser() call.

5) One thing that surprised you about the Event Loop.

Surprised how efficiently the event loop works.

6) One question you still have after today's lesson.

I still have question about how react state updates work internally.

