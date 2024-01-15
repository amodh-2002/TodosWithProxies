import store from "./store.js"

function render(){
   const todos = document.querySelector(".todos")
   const todoElements = store.todos.map((todo)=>
   // the data-id is a special attribute that u can give whenever u wanna have ur own attribute u have to use data as ur first name then - then whatever u can helps this helps js in retriving the attribute easily
   //JavaScript Interaction: It can be used to store information that may be needed by JavaScript for dynamic interactions and functionality on the webpage.
   //When using templates or frameworks, the data- attribute can be used to pass parameters or data to template scripts or components.
   `
   <li class="todo" data-id=${todo.id}>
   <span class="todo-title ${todo.completed ? "completed" : ""}"> ${
           todo.title
         } </span>
   <div class="toggle-delete">
     <input type="checkbox" name="completed" class="todo-checkbox" ${
       todo.completed ? "checked" : ""} />
     <button class="delete-todo-button">x</button>
   </div>
   </li>
   `
   ).join("")
   //What does this .join do learn about it 
   //The .join() method in JavaScript is used to join all elements of an array into a string. It takes an array and concatenates all of its elements into a single string, separating each element with a specified separator.
    //const arr = ['apple', 'banana', 'orange'];
    //const result = arr.join(', '); // Result: 'apple, banana, orange' !! important

    todos.innerHTML = todoElements
}

export default render