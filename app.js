const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = getTodos();
console.log(allTodos);

updateTodoList();
todoForm.addEventListener("submit",function(e){
    e.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText = todoInput.value.trim(); //getting the input from the textbox and assigning the todoText variable
    if(todoText.length > 0){ //writing the if condition because, if the length of the text in the textbox is must greater than zero
        const todoObject = {
            text:todoText,
            completed:false
        }
    allTodos.push(todoObject); //pushing the text from textbox to the allTodos array using the push() method  
    updateTodoList();
    saveData();
    todoInput.value=""; //clearing the textbox for next input
    }
    console.log(allTodos);
   
}
function updateTodoList(){
    todoListUL.innerHTML="";
    allTodos.forEach((todo,todoIndex)=>{
        todoItem = createTodoItem(todo,todoIndex); 
        todoListUL.append(todoItem);
    });
}
function createTodoItem(todo,todoIndex){
    const todoId = `todo${todoIndex}`; 
    const todoLi = document.createElement('li'); //creating list element
    const todoText = todo.text;
    todoLi.className = "todo"
    todoLi.innerHTML = `<input type="checkbox" id=${todoId} >
                    <label for=${todoId} class="custom-checkbox"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                    </label>
                    <label for="${todoId}" class="todo-text">${todoText}
                    </label>
                    <button class="delete-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-color)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>`;
    const deleteButton = todoLi.querySelector(".delete-button");
    deleteButton.addEventListener('click',()=>{
        deleteTodoItem(todoIndex);
    });
    const checkbox = todoLi.querySelector("input");
checkbox.addEventListener("change",()=>{
    allTodos[todoIndex].completed = checkbox.checked;
    saveData();
})
checkbox.checked = todo.completed;
    return todoLi; //appending the todoLi into todoListUL
}
function deleteTodoItem(todoIndex){
allTodos = allTodos.filter((_,i)=> i !== todoIndex);
saveData();
updateTodoList();
}

function saveData(){
    const todosJSON = JSON.stringify(allTodos);
    localStorage.setItem("todo",todosJSON);
}

function getTodos(){
    const todos = localStorage.getItem("todo") || "[]";
    return JSON.parse(todos);
}