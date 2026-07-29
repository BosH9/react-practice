Part 9 – Interview Question

Predict the output:

const person = {
    name: "Alice",

    greet() {
        console.log(this.name);
    }
};

setTimeout(person.greet, 100);

Why?

Ans: When the javascript calls the setTimeout method, inside the person.greet method is not calling, just passing a reference to the function. 
So, greet method is not associated with person object.
After 100ms, greet callback method runs.
It loses it's context, and the result also depends on the strict mode. In the strict mode, this will be 'undefined'. So, it will throw a Type error.
In non-strict mode, this will be window, window.name will be 'undefined'.

Exercise 1

Predict the output.

const user = {
    name: "John",

    show() {
        console.log(this.name);
    }
};

user.show();


Explain why.

Ans: when the show() method called, javascript will check left side of the dot(.) there is user object. so because of the implicit this points to user object.
So, finally in the log whenever it says this.name, it refers to user.name then it logs 'John'.

Exercise 2

Predict the output.

const user = {
    name: "John",

    show() {
        console.log(this.name);
    }
};

const fn = user.show;

fn();


Explain why.

Also explain how to fix it.

Ans: Here we aren't calling show method directly. So, show method assigned to fn, it loses its context.
Then, on calling fn(), two possibilities 
1) strict mode: this -> undefined, so this.name will give Type error.
2) non-strict mode. this -> window, So this.name will be undefined.

Fix: we can bind the user object to the show method like const fn = user.show.bind(user); 

Exercise 3

Predict the output.


function greet(city, country) {
    console.log(this.name, city, country);
}

const person = {
    name: "Alice"
};

greet.call(person, "Hyderabad", "India");

greet.apply(person, ["Hyderabad", "India"]);



Ans: The both call and apply methods will logs 'Alice Hyderabad India'
Because both methods are predefined methods, that allows you to execute method with explicitly specifying that what 'this' key word refers to.
here this refers to person object. when this.name becomes to Alice.
The only deference between these methods are 'call' will take arguments comma(,) separated and 'apply' take as in a array.

Exercise 4

Implement your own bind() function.

Do not use the built-in bind().

Example:

function greet(city) {
    console.log(this.name, city);
}

const person = {
    name: "John"
};

const bound = myBind(greet, person);

bound("Hyderabad");


Ans:

function myBind(fn, obj) {
    return (...args) => {
        fn.call(obj, ...args);
    }
}

function greet(city) {
    console.log(this.name, city);
}

const person = {
    name: "John"
};


const bound = myBind(greet, person);

bound("Hyderabad");

It logs 'John Hyderabad'

Exercise 5

Implement once() again.

This time:

It must preserve:

this
arguments
return value

Handle exceptions correctly:

const fn = once(apiCall);

If apiCall throws an error, the function should be allowed to run again on the next call.

Ans:


function once(fn) {
  let hasRun = false;
  let result;

return function wrapper(...args) {
    if (hasRun) {
      return wrapper.result;
    }

    try {
      wrapper.thisArg = this;
      wrapper.args = [...args];
      wrapper.result = fn.apply(this, args);

      hasRun = true;
      console.log(wrapper)
      return wrapper.result;
    } catch (err) {
      wrapper.thisArg = undefined;
      wrapper.args = undefined;
      wrapper.result = undefined;
      throw err;
    }
  }

}

let attempts = 0;
function apiCall() {
  attempts++;

  console.log(`Attempt ${attempts}`);

  if (attempts < 3) {
    throw new Error("Network Error");
  }

  return "Success";
}

const fn = once(apiCall);

try {
  fn();
} catch (e) {
  console.log(e.message);
}

try {
  fn();
} catch (e) {
  console.log(e.message);
}

try {
  console.log(fn());
} catch (e) {
  console.log(e.message);
}


Senior Challenge

Implement a compose() utility.

Ans:

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;


function compose(...fns) {
  return function (value) {
    let result = value;

    for (let i = fns.length - 1; i >= 0; i--) {
      result = fns[i](result);
    }

    return result;
  };
}

const fn = compose(square, double, addOne);

console.log(fn(3));




Q) Why don't React functional components use this?
Ans: React functional components don't use this because they're just JavaScript functions. React moved away from class-based components to make components simpler, more predictable, and easier to reuse.
In JavaScript, this is used to reference a specific class instance. Since functional components do not create instances, there is no object for this to point to.

Q) Why are arrow functions commonly used for event handlers?
Ans: Arrow functions are commonly used for event handlers for two main reasons:

1)They don't have their own this (they capture it lexically).
2)They make it easy to pass arguments to handlers.
in modern React functional components, the most common reason for arrow functions is deferring execution and optionally passing arguments, not preserving this. Preserving this is primarily a concern with class-based components or plain JavaScript objects.


Q) When would using bind() still be useful today?
Ans: It can used for a few usecases

1. Preserving this for callbacks


    const person = {
      name: "Alice",

      greet() {
        console.log(this.name);
      }
   };

setTimeout(person.greet.bind(person), 100);


without bind, this -> person will be lost.

2. Event listeners
    
        class User {
  constructor(name) {
    this.name = name;
  }

  handleClick() {
    console.log(this.name);
  }
}

const user = new User("John");

button.addEventListener(
  "click",
  user.handleClick.bind(user)
);

Otherwise, the event listener would call handleClick with a different this.
    
 
3. Partial application

function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);

console.log(double(5));

double(5) will become -> multiply(2, 5)
the output will be 10

4. Borrowing methods


const person = {
  name: "Alice",

  greet(city) {
    console.log(this.name, city);
  }
};

You can permanently reuse it for another object.

const employee = {
  name: "Bob"
};

const greetEmployee = person.greet.bind(employee);

greetEmployee("London");




Output:

Bob London
