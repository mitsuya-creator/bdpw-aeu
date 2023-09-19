document.addEventListener("DOMContentLoaded", () => {
    const submitForm = document.getElementById("form");
    submitForm.addEventListener("submit", e => {
        e.preventDefault();
        addTodo();
    })
})

function addTodo() {
    const textTodo = document.getElementById("title").value;
    const timeStamp = document.getElementById("date").value;

    const generatedId = generateId();
    const todoObject = generateTodoObject(generatedId, textTodo, timeStamp, false);
    todos.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}


function generateId() {
    return +new Date()
}
function generateTodoObject(id, task, timeStamp, isCompleted) {
    return {
        id,
        task,
        timeStamp,
        isCompleted
    }
}

function makeTodo(todoObject) {
    const textTitle = document.createElement("h2");
    textTitle.innerHTML = todoObject.task;

    const textTimeStamp = document.createElement("p");
    textTimeStamp.innerHTML = todoObject.timeStamp;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textTitle, textTimeStamp);

    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);
    container.setAttribute("id", `todo-${todoObject.id}`);

    if (todoObject.isCompleted) {
        const undoButton = document.createElement("button");
        undoButton.classList.add("undo-button");

        undoButton.addEventListener("click", () => {
            undoTaskFromCompeletd(todoObject.id);
        })

        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-button");

        trashButton.addEventListener("click", () => {
            removeTaskFromCompleted(todoObject.id);
        })

        container.append(undoButton, trashButton);
    } else {
        const checkButton = document.createElement("button");
        checkButton.classList.add("check-button");

        checkButton.addEventListener("click", () => {
            addTaskCompleted(todoObject.id);
        })

        container.append(checkButton);
    }

    return container;
}

function addTaskCompleted(todoId) {
    const todoTarget = findTodo(todoId);
    if (todoTarget == null) return;
    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findTodo(todoId) {
    for (const todoItem of todos) {
        if (todoItem.id == todoId) {
            return todoItem;
        }
    }
    return null;
}
function removeTaskFromCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);
    if (todoTarget === -1) return;
    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
}
function undoTaskFromCompeletd(todoId) {
    const todoTarget = findTodo(todoId);
    if (todoTarget == null) return;
    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
}
function findTodoIndex(todoId) {
    for (const index in todos) {
        if (todos[index].id === todoId) {
            return index;
        }
    }
    return -1;
}
const todos = [];
const RENDER_EVENT = "render_todo";

document.addEventListener(RENDER_EVENT, () => {
    const unCompletedTodoList = document.getElementById("todos");
    unCompletedTodoList.innerHTML = "";

    const completedTodoList = document.getElementById("completed-todos");
    completedTodoList.innerHTML = "";

    for (const todoItem of todos) {
        const todoElement = makeTodo(todoItem);
        if (!todoItem.isCompleted) {
            unCompletedTodoList.append(todoElement);
        } else {
            completedTodoList.append(todoElement);
        }
    }
});