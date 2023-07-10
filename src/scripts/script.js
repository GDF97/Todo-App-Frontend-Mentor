// Variables
const body = document.querySelector("body");
const btnSwitchTheme = document.getElementById("btnSwitchTheme");
const inputTodo = document.getElementById("inputTodo");
const createTodo = document.querySelector(".btn-create");
const todoList = document.querySelector(".todo-list");
const allTodos = document.querySelectorAll(".todo");
const filterButtons = document.querySelectorAll(".wrapper-buttons button");
const clearButton = document.getElementById("btnClearCompleted");
const deleteTodo = document.querySelectorAll("#deleteTodo");
let remainingItems = document.getElementById("remaining-items");
let items;
// Functions
const switchTheme = () => {
  if (body.classList.contains("darkTheme")) {
    body.classList.replace("darkTheme", "lightTheme");
    btnSwitchTheme.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>`;
  } else {
    body.classList.replace("lightTheme", "darkTheme");
    btnSwitchTheme.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>`;
  }
};

const saveTodo = (text) => {
  text = inputTodo.value;
  let todo = document.createElement("div");
  todo.classList.add("todo");
  todo.classList.add("active");

  let span = document.createElement("span");
  span.classList.add("wrapper");

  let inputChkBox = document.createElement("span");
  inputChkBox.classList.add("checkbtn");

  let inputValue = document.createElement("p");
  inputValue.textContent = text;

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("DeleteTodo");
  deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>`;

  span.append(inputChkBox);
  span.append(inputValue);

  todo.append(span);
  todo.append(deleteButton);

  todoList.append(todo);
  updateRemainingItems();

  inputTodo.value = "";
  inputTodo.focus();
};

const updateRemainingItems = () => {
  const activeTodos = document.querySelectorAll(".active");
  items = activeTodos.length;
  return (remainingItems.textContent = `${items} items left`);
};
updateRemainingItems();

const deleteOneTodo = (e) => {
  let buttonClicked = e.target;
  let parentElement = buttonClicked.closest(".todo");

  parentElement.remove();
};

const deleteAllCompletedTodo = () => {
  const completedTodos = document.querySelectorAll(".completed");
  completedTodos.forEach((todo) => todo.remove());
};

const filterElements = (e) => {
  const activeTodos = document.querySelectorAll(".active");
  const completedTodos = document.querySelectorAll(".completed");
  const btnActiveTodos = document.querySelectorAll("#activeTodos");
  const btnAllTodos = document.querySelectorAll("#allTodos");
  const btnCompletedTodos = document.querySelectorAll("#completedTodos");

  let buttonWithSelectedClass = document.querySelectorAll(".selected");
  let buttonClicked = e.target;
  if (buttonWithSelectedClass.value != buttonClicked.value) {
    buttonClicked.classList.add("selected");
    buttonWithSelectedClass.forEach((button) =>
      button.classList.remove("selected")
    );
  }

  if (buttonClicked.value == "completed") {
    console.log("completed");
    completedTodos.forEach((todo) => (todo.style.display = "flex"));
    activeTodos.forEach((todo) => (todo.style.display = "none"));
    btnCompletedTodos.forEach((button) => button.classList.add("selected"));
  } else if (buttonClicked.value == "active") {
    console.log("active");
    activeTodos.forEach((todo) => (todo.style.display = "flex"));
    completedTodos.forEach((todo) => (todo.style.display = "none"));
    btnActiveTodos.forEach((button) => button.classList.add("selected"));
  } else {
    console.log("all");
    completedTodos.forEach((todo) => (todo.style.display = "flex"));
    activeTodos.forEach((todo) => (todo.style.display = "flex"));
    allTodos.forEach((todo) => (todo.style.display = "flex"));
    btnAllTodos.forEach((button) => button.classList.add("selected"));
  }
};

// Events
btnSwitchTheme.addEventListener("click", switchTheme);

createTodo.addEventListener("click", (e) => {
  e.preventDefault();

  let todoItem = inputTodo.value;

  if (todoItem) {
    saveTodo(todoItem);
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", filterElements);
});

document.addEventListener("click", (e) => {
  let targetElement = e.target;

  if (targetElement.classList.contains("todo")) {
    if (!targetElement.classList.contains("active")) {
      targetElement.classList.remove("completed");
      targetElement.classList.add("active");
    } else {
      targetElement.classList.remove("active");
      targetElement.classList.add("completed");
    }
    updateRemainingItems();
  }

  if (targetElement.classList.contains("DeleteTodo")) {
    deleteOneTodo(e);
    updateRemainingItems();
  }
});

clearButton.addEventListener("click", deleteAllCompletedTodo);
