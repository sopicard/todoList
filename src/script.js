window.onload = init;
let todoList = [];

function init() {
  loadTodos();
  listenFormEvents();
}

//Only if the localstorage contains infos (todoList)
function loadTodos() {
  if (!localStorage.getItem('todoList')) {
    return
  };
  //JSON.parse to convert the string to an JS object
  todoList = JSON.parse(localStorage.getItem('todoList'));

  //For each element (todo) the same actions as for the addTodo function + combination of the checked and removed functions.
  todoList.forEach(todo => {
    const list = document.querySelector('ul');
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="text" value="${todo.name}" class="todo-input">
      <input type="checkbox" class="check">
      <i class="fa-solid fa-trash-can"></i>
      <i class="fa-regular fa-floppy-disk"></i>`;

    if (todo.checked) {
      li.classList.toggle('checked');
    }

    li.querySelector('.check').addEventListener('click', todoChecked);
    li.querySelector('.fa-trash-can').addEventListener('click', todoRemoved);
    list.insertBefore(li, list.children[0]);
  });
}

// When the page is loaded, a method to listen events on the form. Only the clearly explained event will be managed. The default ones (the others) will be ignored.
function listenFormEvents() {
  document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    addTodo();
  });
}

// QuerySelector method on the document interface allows to target the form text area ('form input')
// Same with list and items
function addTodo() {
  const todo = document.querySelector('form input');

  //In order to find items, choice of identification by name. And prohibition of duplicates
  if (todoList.find(item => item.name === todo.value)) {
    alert('Item déjà présent dans la liste')
    return;
  }

  const list = document.querySelector('ul');
  const li = document.createElement('li');
  li.innerHTML = `
      <input type="text" value="${todo.value}" class="todo-input">
      <input type="checkbox" class="check">
      <i class="fa-solid fa-trash-can"></i>
      <i class="fa-regular fa-floppy-disk"></i>`;

  li.querySelector('.check').addEventListener('click', todoChecked);
  li.querySelector('.fa-trash-can').addEventListener('click', todoRemoved);
  li.querySelector('.fa-floppy-disk').addEventListener('click', todoModify);
  list.insertBefore(li, list.children[0]);

  todoList.push({
    name: todo.value,
    checked: false
  });

  //Record data in the localstorage. JSONstringify function to change from a JS object to a string
  localStorage.setItem('todoList', JSON.stringify(todoList));

  todo.value = "";
}

//Function to be developed for ToDo List evolution
function todoModify() {
}

//To target the element by name, .target returns the element concerned by the event. Here we target the element immediately before the one specified (in the children list) which is the value
function todoChecked(event) {
  const elementName = event.target.previousElementSibling.value;
  event.target.parentNode.classList.toggle('checked');

  const todo = todoList.find(item => item.name === elementName);
  todo.checked = !todo.checked;

  localStorage.setItem('todoList', JSON.stringify(todoList));
}

//Same approach as for the previous function but referring here to the value of the specified element's parent
function todoRemoved(event) {
  const elementName = event.target.parentNode.querySelector('.todo-input').value;
  const todoIndex = todoList.findIndex(item => item.name === elementName);

  event.target.parentNode.remove();
  todoList.splice(todoIndex, 1);

  localStorage.setItem('todoList', JSON.stringify(todoList));
}