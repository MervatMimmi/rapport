// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

const generateCostumerNum = () => {
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now())).toString(36).substr(2,9)
}

const uniqueId = () => {  
  let newId = generateCostumerNum();
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.map((todo) => {
    while (todo.id.includes(newId)) {
      newId = generateCostumerNum()
    }
  })
  return newId;
} 


//Functions
function addTodo(e) {
    //Prevent form from submitting
    e.preventDefault();

    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.id = uniqueId()

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.value = "false";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Add todo to LocalStorage
    saveLocalTodos(todoDiv.id, todoInput.value, completedButton.value);

    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear todo-input value;
    todoInput.value = ""; 
}

//Check or Delete item from list
function deleteCheck(e) {
    e.preventDefault();
    const item = e.target;

    //Delete Todo
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");

        //remove localStorage
        removeLocalTodos(todo.id);
        todo.addEventListener('transitionend', function() {
          todo.remove();
        });
    }

    //Check mark
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');

        //item.value = (item.value === "false" ) ? "true" : "false";

        // localstorage
        updateLocalTodos(todo.id);
        
    }
}

//Filter options
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if(todo.classList.contains("completed")){
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        default:
          break;
    }
  });
}

//local Storage
function saveLocalTodos(id, description, isCompleted) {

  //check if there is something
  let todos;
  if(localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos") );
  }
  //todos = []; // ibland behöver jag ange vad todo är för typ och ibland inte....detta göra att bugg kommer senare i applicationen
  //console.log(typeof todos)
  todos.push({id, description, isCompleted});
  localStorage.setItem("todos", JSON.stringify(todos) );
}
  
  // Remove local Storage
  function removeLocalTodos(id) {
    let todos;
    if(localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    const index = todos.map((todo) => {
      return todo.id
    }).indexOf(id);
    //console.log(index);
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

//JavaScript
  function updateLocalTodos(id) {
   let todos;
    if(localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todos.findIndex(todo => todo.id === id)
    todos[todoIndex].isCompleted = (todos[todoIndex].isCompleted === "false") ? "true" : "false" ;

    console.log(todos)

   localStorage.setItem("todos", JSON.stringify(todos));
  }


function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    //console.log(typeof todo);
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.id = todo.id
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.description;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    completedButton.value = todo.isCompleted
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    {completedButton.value = (todo.isCompleted === "true") ? todoDiv.classList.toggle("completed") : null}
    //attach final Todo
    todoList.appendChild(todoDiv);
  })
}