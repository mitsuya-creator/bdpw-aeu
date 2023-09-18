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

const todos = [];
const RENDER_EVENT = "render_todo";

document.addEventListener(RENDER_EVENT, () => console.log(todos));