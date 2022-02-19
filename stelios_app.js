const listsContainer = document.querySelector(".all-lists");

let myLists = ["hi", "two"];

class List {
  constructor(item) {
    this.ulWithTasks = item;
  }
  addList() {
    const listName = document.querySelector("[data-add-list-name]").value;
    if (!listName) alert("invalid input");

    const listItem = {
      name: listName,
      id: myLists.length,
    };
    myLists.push(listItem);
    listItem.rend();
    document.querySelector("[data-add-list-name]").value = "";
  }
  rend() {
    listsContainer.innerHTML = "";

    myLists.forEach((list) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("contenteditable", "true");
      listItem.classList.add("list-name");
      listItem.innerText = list;
      listsContainer.appendChild(listItem);
    });
  }
}
new List().rend();
