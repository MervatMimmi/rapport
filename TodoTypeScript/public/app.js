"use strict";
//class implementing the interface
class Todo {
    constructor(id, description, isCompleted) {
        this.id = id;
        this.description = description;
        this.isCompleted = isCompleted;
    }
}
//class ListTemplate 
class ListTemplate {
    constructor(container) {
        this.container = container;
    }
    render(todo) {
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
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const filterOption = document.querySelector(".filter-todo");
// ListTemplate instance
const todoList = document.querySelector("ul");
const list = new ListTemplate(todoList);
//EventListener
document === null || document === void 0 ? void 0 : document.addEventListener("DOMContentLoaded", getTodos);
todoButton === null || todoButton === void 0 ? void 0 : todoButton.addEventListener("click", addTodo);
todoList === null || todoList === void 0 ? void 0 : todoList.addEventListener("click", deleteCheck);
filterOption === null || filterOption === void 0 ? void 0 : filterOption.addEventListener("click", filterTodo);
//EventListener
function addTodo(e) {
    e.preventDefault();
    //console.log(todoInput.value);
    const generateCostumerNum = () => {
        return Math.floor(Math.random() * Math.floor(Math.random() * Date.now())).toString(36).substr(2, 9);
    };
    const uniqueId = () => {
        let newId = generateCostumerNum();
        const todos = JSON.parse(localStorage.getItem("todos") || "[]");
        todos.map((todo) => {
            //console.log(todo.id);
            while (todo.id.includes(newId)) {
                newId = generateCostumerNum();
            }
        });
        return newId;
    };
    let values;
    values = [uniqueId(), todoInput.value, false];
    let todoDoc;
    todoDoc = new Todo(...values);
    //console.log(todoDoc);
    list.render(todoDoc);
    //Clear todo-input value;
    todoInput.value = "";
}
;
function deleteCheck(e) {
    e.preventDefault();
    const item = e.target;
    //delete
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        if (todo !== null) {
            todo.classList.add("fall");
            removeLocalTodos(todo.id);
            todo.addEventListener("transitioned", function () {
                todo.remove();
            });
        }
    }
    //completed
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        if (todo !== null) {
            todo.classList.toggle("completed");
            //localStorage
            updateLocalTodos(todo.id);
        }
    }
}
function filterTodo(e) {
    const todos = Array.from(todoList.children); //Convert an HTMLCollection to an Array
    if (e.target !== null) {
        todos.forEach((todo) => {
            switch (e.target.value) {
                case "all":
                    todo.setAttribute("style", "display: flex");
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.setAttribute("style", "display: flex");
                    }
                    else {
                        todo.setAttribute("style", "display: none");
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.setAttribute("style", "display: flex");
                    }
                    else {
                        todo.setAttribute("style", "display: none");
                    }
                default:
                    break;
            }
        });
    }
}
function saveLocalTodos(todo) {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos") || "[]");
    }
    //console.log(todo);
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todoId) {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos") || "[]"); // var {} innan 
    }
    const index = todos.map((todo) => {
        return todo.id;
    }).indexOf(todoId);
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
//update localStorage
function updateLocalTodos(todoId) {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos") || "[]");
    }
    console.log(todos);
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    console.log(todoIndex);
    console.log(todos[todoIndex]);
    todos[todoIndex].isCompleted = (todos[todoIndex].isCompleted === false) ? true : false;
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos") || "{}");
    }
    todos.forEach((todo) => {
        const completedValue = todo.isCompleted.toString();
        const newTodo = document.createElement("div");
        newTodo.classList.add("todo");
        newTodo.id = todo.id;
        const todoItem = document.createElement("li");
        todoItem.innerText = todo.description;
        todoItem.classList.add("todo-item");
        newTodo.appendChild(todoItem);
        todoInput.value = "";
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        completedButton.value = completedValue;
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
    });
}
