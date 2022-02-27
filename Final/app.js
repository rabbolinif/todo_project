// Selectors

const toDoInput = document.querySelector(".to-do");
const toDoButton = document.querySelector(".todo-button");
const toDoList = document.querySelector(".task-list");
const filterOption = document.querySelector(".h3");
const listsContainer = document.querySelector(".my-lists");
const addListForm = document.querySelector("[data-add-list-form]");
const addTaskBtn = document.querySelector("[data-add-task-btn]");
const deleteListBtn = document.querySelector("[data-delete-list-btn]");
const listDispalyContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitle = document.querySelector("[data-list-title]");
const taskCount = document.querySelector("[data-task-count]");

// Event Listeners

document.addEventListener("DOMContentLoaded", getToDos);
toDoButton.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterToDo);
listsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    e.target.classList.add("active-list");
    selectedList = e.target.dataset.listId;
    myObj.save();
    myObj.rend();
  }
});
addListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  myObj.addList();
});

deleteListBtn.addEventListener("click", () => {
  myLists = myLists.filter((list) => list.id != selectedList);

  console.log(myLists);
  selectedList = null;
  myObj.save();
  myObj.rend();
});

// Functions

function addToDo(event) {
  // Prevent form from submitting
  event.preventDefault();
  // To do div
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("todo");
  // Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "";
  completedButton.classList.add("complete-btn");
  toDoDiv.appendChild(completedButton);
  // Create li
  const newToDo = document.createElement("li");
  newToDo.innerText = toDoInput.value;
  newToDo.classList.add("todo-item");
  toDoDiv.appendChild(newToDo);
  // Add to do to local storage
  saveLocalToDos(toDoInput.value);
  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<svg><use href="#delete-icon"></use></svg>';
  deleteButton.classList.add("delete-btn");
  toDoDiv.appendChild(deleteButton);
  // Append to list
  toDoList.appendChild(toDoDiv);
  // Clear to do input value
  toDoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // Delete to do
  if (item.classList[0] === "delete-btn") {
    const toDo = item.parentElement;
    removeLocalToDos(toDo);
    toDo.remove();
  }

  // Check mark
  if (item.classList[0] === "complete-btn") {
    const toDo = item.parentElement;
    toDo.classList.toggle("done");
  }
}

function filterToDo(e) {
  const toDos = toDoList.childNodes;
  toDos.forEach(function (toDo) {
    switch (e.target.id) {
      case "all":
        toDo.style.display = "flex";
        break;
      case "completed":
        if (toDo.classList.contains("done")) {
          toDo.style.display = "flex";
        } else {
          toDo.style.display = "none";
        }
        break;
      case "open":
        if (!toDo.classList.contains("done")) {
          toDo.style.display = "flex";
        } else {
          toDo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalToDos(todo) {
  // Is sommething already there?
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }
  toDos.push(todo);
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function getToDos() {
  // Is sommething already there?
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }
  toDos.forEach(function (todo) {
    // To do div
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");
    // Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "";
    completedButton.classList.add("complete-btn");
    toDoDiv.appendChild(completedButton);
    // Create li
    const newToDo = document.createElement("li");
    newToDo.innerText = todo;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);
    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<svg><use href="#delete-icon"></use></svg>';
    deleteButton.classList.add("delete-btn");
    toDoDiv.appendChild(deleteButton);
    // Append to list
    toDoList.appendChild(toDoDiv);
  });
}

function removeLocalToDos(todo) {
  // Is sommething already there?
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }
  const toDoIndex = todo.children[1].innerText;
  toDos.splice(toDos.indexOf(toDoIndex), 1);
  localStorage.setItem("toDos", JSON.stringify(toDos));
}
const LOCAL_STORAGE_LIST_KEY = "task.myLists";
const LOCAL_STORAGE_SELECTED_LIST_KEY = "task.selectedList";
let myLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedList = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_KEY);
class List {
  constructor(item) {
    this.ulWithTasks = item;
  }
  addList() {
    const listName = document.querySelector("[data-add-list-name]").value;
    if (!listName) return alert("invalid input");

    const listItem = {
      name: listName,
      id: myLists.length,
      tasks: [],
    };
    myLists.push(listItem);
    this.save();
    this.rend();
    document.querySelector("[data-add-list-name]").value = "";
  }
  save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(myLists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_KEY, selectedList);
  }
  clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
  rend() {
    this.clearContainer(listsContainer);
    myLists.forEach((list) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-name");
      listItem.dataset.listId = list.id;
      if (listItem.dataset.listId === selectedList) {
        listItem.classList.add("active-list");
      }
      listItem.innerText = list.name;
      listsContainer.appendChild(listItem);
    });
  }
}

myObj = new List();
myObj.rend();
