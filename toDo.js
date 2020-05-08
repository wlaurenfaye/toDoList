//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');



//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



//FUNCTIONS
function addTodo(event){

    //prevent form from submitting
    event.preventDefault();

    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    /// ADD TODO TO LOCAL localStorage
    saveLocalTodos(todoInput.value);

    //check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //apprnd to listeners
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value= "";
  }
//DELETE
  function deleteCheck(e){
    const item = e.target;

    //delete todo, if first class of the item selected is = to trash-btn, delete the item
    if (item.classList[0] === "trash-btn"){
      const todo = item.parentElement;
      //animation
      todo.classList.add('fall');
      removeLocalTodos(todo);
      todo.addEventListener('transitioned', function (){
        todo.remove();
      });
    }

    //check mark
    if (item.classList[0] === "complete-btn"){
      const todo = item.parentElement;
      todo.classList.toggle('completed');
    }
  }

  //filter

  function filterTodo (e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
      switch(e.target.value) {
        case "all":
          todo.style.display = 'flex';
          break;
        case "completed":
        if(todo.classList.contains('completed')){
          todo.style.display = 'flex';
        }else {
          todo.style.display="none";
        }
        break;
        case "uncompleted":
      if(!todo.classList.contains('completed')) {
        todo.style.display = 'flex';
      }  else {
        todo.style.display="none";
      }
      break;
    }
    });
  }

  //save todos
  function saveLocalTodos(todo){
    //CHECK--DO I ALREADY HAVE TODOS?
    let todos;
    //if i dont have any, create an empty array
    if (localStorage.getItem('todos') === null){
      todos=[];
    }else{
      //if i do, print todos
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
    }


    function getTodos (){
      //CHECK--DO I ALREADY HAVE TODOS?
      let todos;
      //if i dont have any, create an empty array
      if (localStorage.getItem('todos') === null){
        todos=[];
      }else{
        //if i do, print todos
        todos = JSON.parse(localStorage.getItem('todos'));
      }
      todos.forEach(function(todo){
        //todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        //LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);


        //check button
        const completedButton = document.createElement('button');
        completedButton.innerHTML='<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML='<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //apprnd to listeners
        todoList.appendChild(todoDiv);
      });
    }
    function removeLocalTodos(todo){
      //CHECK--DO I ALREADY HAVE TODOS?
      let todos;
      //if i dont have any, create an empty array
      if (localStorage.getItem('todos') === null){
        todos=[];
      }else{
        //if i do, print todos
        todos = JSON.parse(localStorage.getItem('todos'));
      }
      const todoIndex = todo.children[0].innerText;
      todos.splice(todos.indexOf(todoIndex),1);
      localStorage.setItem("todos",JSON.stringify(todos));
    }
