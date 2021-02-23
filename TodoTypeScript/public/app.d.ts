interface ITodo {
    id: string;
    description: string;
    isCompleted: boolean;
}
declare class Todo implements ITodo {
    id: string;
    description: string;
    isCompleted: boolean;
    constructor(id: string, description: string, isCompleted: boolean);
}
declare class ListTemplate {
    private container;
    constructor(container: HTMLUListElement);
    render(todo: ITodo): void;
}
declare const todoInput: HTMLInputElement;
declare const todoButton: HTMLInputElement;
declare const filterOption: HTMLInputElement;
declare const todoList: HTMLUListElement;
declare const list: ListTemplate;
declare function addTodo(e: Event): void;
declare function deleteCheck(e: Event): void;
declare function filterTodo(e: Event): void;
declare function saveLocalTodos(todo: ITodo): void;
declare function removeLocalTodos(todoId: string): void;
declare function updateLocalTodos(todoId: string): void;
declare function getTodos(): void;
