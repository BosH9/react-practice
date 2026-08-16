// Exercise 1

// Predict the output.

console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");

// Explain why.

// Exercise 2

// Predict the output.

console.log(1);

Promise.resolve().then(() => {
    console.log(2);
});

console.log(3);

// Explain why.

// Exercise 3

// Predict the output.

console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");

// Explain the execution order step by step.

// Exercise 4

// Predict the output.

async function test() {
    console.log(1);

    await Promise.resolve();

    console.log(2);
}

console.log(3);

test();

console.log(4);

// Explain what await actually does.

// Exercise 5

// Predict the output.

console.log(1);

Promise.resolve().then(() => {
    console.log(2);

    setTimeout(() => {
        console.log(3);
    }, 0);

    Promise.resolve().then(() => {
        console.log(4);
    });
});

console.log(5);

// This tests nested microtasks.