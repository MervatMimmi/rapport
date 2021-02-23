
//Interface to define the structure of Todo
interface ITodo {
    id: string;
    description: string;
    isCompleted: boolean;
}


//class implementing the interface
class Todo implements ITodo {
    constructor(
        public id: string,
        public description: string,
        public isCompleted: boolean,
    ) {}
}



//class ListTemplate 
class ListTemplate{
    constructor(private container: HTMLUListElement) {}

    render(todo: ITodo) {
        const newTodo = document.createElement("div");
        newTodo.id = todo.id;
        newTodo.classList.add("todo");
        //console.log(newTodo);
        
        const todoItem = document.createElement("li");
        todoItem.innerText = todo.description;
        todoItem.classList.add("todo-item");
        newTodo.appendChild(todoItem);
       
        //Check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.value = "false";
    
        completedButton.classList.add("complete-btn");
        newTodo.appendChild(completedButton);

        //Add Todo to localStorage
        saveLocalTodos(todo);

        
        //Check trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        newTodo.appendChild(trashButton);
        
        this.container.append(newTodo);
    }
}


//Selectors
const todoInput = document.querySelector(".todo-input") as HTMLInputElement;
const todoButton = document.querySelector(".todo-button") as HTMLInputElement;
const filterOption = document.querySelector(".filter-todo") as HTMLInputElement;


// ListTemplate instance
const todoList = document.querySelector("ul")!;
const list = new ListTemplate(todoList);


//EventListener
document?.addEventListener("DOMContentLoaded", getTodos);
todoButton?.addEventListener("click", addTodo);
todoList?.addEventListener("click", deleteCheck);
filterOption?.addEventListener("click", filterTodo);


//EventListener
function addTodo(e: Event){
    e.preventDefault();
    //console.log(todoInput.value);
    const generateCostumerNum = () => {
        return Math.floor(Math.random() * Math.floor(Math.random() * Date.now())).toString(36).substr(2,9)
      }
      
      const uniqueId = () => {  
        let newId : string = generateCostumerNum();
        const todos = JSON.parse(localStorage.getItem("todos") || "[]");
        todos.map((todo : {id: string}) => {
          //console.log(todo.id);
          while (todo.id.includes(newId)) {
            newId = generateCostumerNum()
          }
        })
        return newId;
      } 

    let values: [string, string, boolean];
    values = [uniqueId(), todoInput.value, false];

    let todoDoc: ITodo;
    todoDoc = new Todo(...values);
    //console.log(todoDoc);

    list.render(todoDoc);

     //Clear todo-input value;
    todoInput.value = ""; 
};


function deleteCheck(e : Event){
    e.preventDefault();

    const item = e.target as HTMLElement

    //delete
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //Animation
        if(todo !== null) {
            todo.classList.add("fall");

        removeLocalTodos(todo.id);

        todo.addEventListener("transitioned", function() {
            todo.remove();
            })
        }
    }

    //completed
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        if(todo !== null) {
            todo.classList.toggle("completed");

            //localStorage
            updateLocalTodos(todo.id);
        }
    }
}


function filterTodo(e: Event) {
    const todos = Array.from(todoList.children); //Convert an HTMLCollection to an Array
    if(e.target !== null) {
        todos.forEach((todo) => {
            switch ((e.target as HTMLInputElement).value){
                case "all":
                    todo.setAttribute("style", "display: flex");
                    break;
                case "completed":
                    if(todo.classList.contains("completed") ) {
                        todo.setAttribute("style", "display: flex");
                    } else {
                        todo.setAttribute("style", "display: none");
                    }
                    break;
                case "uncompleted":
                    if(!todo.classList.contains("completed") ) {
                        todo.setAttribute("style", "display: flex");
                    } else {
                        todo.setAttribute("style", "display: none");
                    }
                    default:
                    break;
            }
        
        })
    }
}
    

function saveLocalTodos(todo: ITodo ){ // ITODO
    let todos: ITodo[] = [];
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
         todos = JSON.parse(localStorage.getItem("todos") || "[]");
    }
    //console.log(todo);
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todoId: string) { 
    let todos: ITodo[] = [];
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
         todos = JSON.parse(localStorage.getItem("todos") || "[]"); // var {} innan 
    }
    
    const index = todos.map((todo : ITodo)  => { // todo: {id:string} not working??!
        return todo.id 
    }).indexOf(todoId);
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//update localStorage
function updateLocalTodos(todoId : string) {
    let todos: ITodo[] = [];

    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos") || "[]");
    }
    console.log(todos);
    
    const todoIndex = todos.findIndex((todo: ITodo) => todo.id  === todoId)
    console.log(todoIndex);
    console.log(todos[todoIndex]);
    todos[todoIndex].isCompleted = (todos[todoIndex].isCompleted === false) ? true : false
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {
    let todos: [];
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos") || "{}");
    }
    todos.forEach((todo: ITodo ) => {  //{id: string, description: string, isCompleted: boolean}

        const completedValue = todo.isCompleted.toString();
        
        const newTodo = document.createElement("div");
        newTodo.classList.add("todo");
        newTodo.id = todo.id
        
        const todoItem = document.createElement("li");
        todoItem.innerText = todo.description;
        todoItem.classList.add("todo-item");
        newTodo.appendChild(todoItem);
        todoInput.value = "";

        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        completedButton.value = completedValue
        newTodo.appendChild(completedButton); 
    
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        newTodo.appendChild(trashButton);
        //completedButton.value = (completedValue === "true") ? newTodo.classList.toggle("completed") : "false";
        //completedButton.value = (completedValue === "true") ? "false" : "true";
        (completedValue === "true") ? newTodo.classList.toggle("completed") : null;

      /*   if (completedValue === "true") {
            newTodo.classList.toggle("completed")
        } */

        todoList.appendChild(newTodo);
    }) 
}

