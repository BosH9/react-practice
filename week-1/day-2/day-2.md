Exercise 1:

first console logs "undefined"
and next console logs "5"

because when javascript runs execution context, in creation phase variables register and assign with undefined.
When comes into the execution phase, the variables are initialized with values.

So, when the first console.log access variable a, it logs undefined then after next console.log logs 5.

Exercise 2:

Gives reference error as 'let a' registers but the 'a' cant be accessed, its only accessed after the initialization of 'a'. 

Exercise 3:

It logs 'Hello'. As the functions are registered with the definition while creation phase. so when it logs the methods, it will access the definition and logs 'Hello'

Exercise 4:

It gives ReferenceError: Cannot access 'greet' before initialization, as greet is a arrow function and in the creation const greet created but can't access. so calling greet before its initialization gives error.

Exercise 5:

Will this throw an error? It, wont give any error. It logs '1'.

Because, const doesn't make values immutable. So, we can edit the value of count.

Exercise 6:

function once(fn) {
  let isRun = false;
  let result;

    return function(...args) {
      
      if(!isRun) {
        isRun = true;
        result = fn.call(this, args);
      }
      return result;
    }  
}

function greet(name) {
    console.log(`Hello ${name}`);
}

const greetOnce = once(greet);

greetOnce("John");
greetOnce("Alex");
greetOnce("Peter");


Senior Challenge:

Implement a memoize() function.

const add = (a, b) => {
    console.log("Calculating...");
    return a + b;
};

function memoize(fn){
    let cache = {};
    
    return function(...args){
        const serializeArg = JSON.stringify(args);
        if(cache.hasOwnProperty(serializeArg)){
            return cache[serializeArg];
        } 
            const result = fn.apply(this, args)
            cache[serializeArg] = result;
            return result;
        
    }
    
}

const memoizedAdd = memoize(add);

console.log(memoizedAdd(2, 3)); // Calculating... → 5
console.log(memoizedAdd(2, 3)); // 5 (cached)
console.log(memoizedAdd(5, 6)); // Calculating... → 11
console.log(memoizedAdd(5, 6)); // 11 (cached)
console.log(memoizedAdd(3, 3)); // Calculating... → 6
console.log(memoizedAdd(2, 3)); // 5 (cached)

What is Hoisting?

The process of variables and function declarations at the creation stage of execution context.
Here, the variables are registered and initialized with undefined and function declarations fully defined with definition. let and const are registered in the memory but won't get initialized until the execution reached its declaration.

What is TDZ?

TDZ - Temporal dead zone, it's a state where let and const are registered in the memory but wont get initialized until it reaches the declaration in the execution phase.

Why are function declarations hoisted differently from function expressions?

function greet() {
  return "Hello!";
}

Because it is a standalone declaration, the parser immediately recognizes it as a complete unit. During the Creation Phase, the JS engine:

Allocates memory for the identifier (greet).
Creates the actual Function Object in memory.
Points greet to that function object before a single line of code executes.

Where are function expressions:
greet();

var greet = () => {
  return "Hello!";
}

here During the creation phase, variable are registered and assigned with undefined and here the function definition is at the rightside, so it won't reached until the exection phase. So whenever we access greet(), it was undefined and if we call it will give the reference error.


Finally what surprised me is that I know about closures but i didn't. Finally i got a indepth experience.


