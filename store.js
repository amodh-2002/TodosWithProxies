const store = {
    todos: [
      {
        id: "1",
        title: "Complete Task A",
        completed: false,
      },
      {
        id: "2",
        title: "Read Book",
        completed: true,
      },
    ],
  };



  const storeHandler ={
    //these are called traps in simple terms these are the get and set we try to do when submitting the form
    get(target,property){
        console.log("ur trying to get this property" , property)
        return target[property]
    },
    set(target,property,value){
        console.log(target,property,value)
        //try to understand the logs properly very impportant 
        target[property] = value
        if(property==="todos"){
            //here i am writing my custom events which runs whenever it is called 
            window.dispatchEvent(new Event("todoschange"))
        }
        localStorage.setItem("store",JSON.stringify(store))
        return true;
        //why we return true learn about it 
    }
  }

//Note : Proxies onyl work with object 
const storeProxy = new Proxy(store,storeHandler)

function addTodo(newTodo){
    //we need to use spread operator cause it creates a new array with all the exsisting values and add the new values as well and shows the changes the in the array cause its a refrence type we simply cant use .push()
    storeProxy.todos = [...storeProxy.todos , newTodo]
}

function deleteTodo(id){
    storeProxy.todos =  storeProxy.todos.filter((todo)=>{
        return todo.id !== id 
    })
}

function toggleCompleted(id,completed){
    storeProxy.todos = storeProxy.todos.map((todo)=>{
        if(todo.id === id){
            return{
                ...todo,completed:completed
            }
        }else{
            return todo
        }
    })
}

export{addTodo}
export{deleteTodo}
export{toggleCompleted}
export default storeProxy