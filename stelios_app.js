const listsContainer = document.querySelector(".all-lists");
const addListForm = document.querySelector("[data-add-list-form]");
const addTaskBtn = document.querySelector("[data-add-task-btn]");
const deleteListBtn = document.querySelector("[data-delete-list-btn]");
const listDispalyContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitle = document.querySelector("[data-list-title]");
const taskCount = document.querySelector("[data-task-count]");

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
