Excercise 1:

logs "John" and 30.

As the javascript executes first name(John) stores into memory then outer() function get called, then age(30) stores, then inner() will get called. as name doesn't find in the inner() scope it will traverse to the outer() scope, as it finds it logs 'John' and then 30.


Excercise 2:

11, 12, 11, 13, 12

Due to the fn1 and fn2 points to 2 different closures , the output like the above.

Excercise 3:

function Bank() {
    
    let balance = 100;
    
     return { 
         getBalance() {
            return balance;
        },
        deposit(amount) {
            balance += amount;
        },
        withdraw(amount) {
            balance -= amount;
        }
     }
}

const accnt = Bank();

console.log(accnt.getBalance())
accnt.deposit(1000);
accnt.withdraw(200);
console.log(accnt.getBalance());
console.log(accnt.balance);

Here we can't access balance from the Bank funtion as it became private to the outer scope.

Exercise 4:

function createIdGenerator() {
    let id = 0;
    
    return function() {
        id = id+1;
        return console.log(id);
    }
}

const generateId = createIdGenerator(); 
generateId(); 
generateId(); 
generateId();

the output will be 
1
2
3

Self-Evaluation Checklist

What is an Execution Context?
Ans: An environment which javascript executes the code.
What is the difference between Scope and Scope Chain?
Ans: Scope is a certain place where the variables exists. Scope chain is finding the variables where if not found traverse inward outer scope.
Why does a closure continue to access variables after a function returns?
Ans: closure has a connection to the variables which resides in the memory, that's why closure continue to access variables after a function returns.
Why are closures important in React?
Ans: closures are retaining the values whenever the re-render happens, on asynchronous calls, and in the hooks. that makes maintainable and computations easy.


A short explanation of closures in my own words:

closures are the functions which hold the outer function variables even after the outer function execution completed.

Example:

function countTicket() {
  let ticketCount = 0;

  return function() {
    ticketCount+= 1;  
    return ticketCount;
  }
}

const book = countTicket();

console.log(book());
console.log(book());
console.log(book());

The output will be 
1
2
3

As the book() holds the connection into the inner function of countTicket and that fucntion holds reference to the ticketCount, so the out put will be 1, 2, 3
}

