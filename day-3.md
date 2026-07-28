**Part 9 – Interview Question**

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

**Exercise 1**

Predict the output.
```
const user = {
    name: "John",

    show() {
        console.log(this.name);
    }
};

user.show();
```

Explain why.

Ans: when the show() method called, javascript will check left side of the dot(.) there is user object. so because of the implicit this points to user object.
So, finally in the log whenever it says this.name, it refers to user.name then it logs 'John'.

**Exercise 2**

Predict the output.
```
const user = {
    name: "John",

    show() {
        console.log(this.name);
    }
};

const fn = user.show;

fn();
```

Explain why.

Also explain how to fix it.

Ans: Here we aren't calling show method directly. So, show method assigned to fn, it loses its context.
Then, on calling fn(), two possibilities 
1) strict mode: this -> undefined, so this.name will give Type error.
2) non-strict mode. this -> window, So this.name will be undefined.

Fix: we can bind the user object to the show method like const fn = user.show.bind(user); 

**Exercise 3**

Predict the output.

```
function greet(city, country) {
    console.log(this.name, city, country);
}

const person = {
    name: "Alice"
};

greet.call(person, "Hyderabad", "India");

greet.apply(person, ["Hyderabad", "India"]);

```

Ans: The both call and apply methods will logs 'Alice Hyderabad India'
Because both methods are predefined methods, that allows you to execute method with explicitly specifying that what 'this' key word refers to.
here this refers to person object. when this.name becomes to Alice.
The only deference between these methods are 'call' will take arguments comma(,) specified and 'apply' take as in a array.

