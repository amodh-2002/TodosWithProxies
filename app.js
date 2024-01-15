import render from "./render.js";
import storeProxy from "./store.js";
import { addTodo } from "./store.js";
import { deleteTodo } from "./store.js";
import { toggleCompleted } from "./store.js";

window.addEventListener("todoschange",()=>{
    console.log("Changed todos")
    render()
})

//try to get the todo from localstorage if it exsists 
const storeFromLocalStorage = JSON.parse(localStorage.getItem("store"))
if(storeFromLocalStorage?.todos.length > 0){
    storeProxy.todos = storeFromLocalStorage.todos
}else{
    localStorage.setItem("store",JSON.stringify(storeProxy))
    render();
}



const form = document.querySelector("#form")
const inputElemet = document.querySelector(".todo-title-input")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const todoTitle = inputElemet.value
    const newTodo = {id:crypto.randomUUID(),title:todoTitle,completed:false}
    addTodo(newTodo)
})

//now deletion of todos this can be done by applying addEventListener to each of the button but we can use Dom concept of DOm delegation and bubbling where we call parent and apply the event to the child

const todos = document.querySelector(".todos")
todos.addEventListener("click",(e)=>{
    const target = e.target
    if(target.classList.contains("delete-todo-button")){
        console.log("You clicked on x button")
        //learn about closest very important
        const id = target.closest(".todo").dataset.id
        console.log(id)
        deleteTodo(id)
    }
})
todos.addEventListener("change",(e)=>{
    const target = e.target
    if(target.classList.contains("todo-checkbox")){
        console.log("You clicked on checked button")
        //learn about closest very important
        const id = target.closest(".todo").dataset.id
        const completed = target.checked
        //very important learn about it 
        toggleCompleted(id,completed)
    }
})


