const addItems = document.querySelector(".addItems");
const content = document.querySelector(".content");
const header = document.querySelector(".header");




function returnEditingItem() {
  const items = content.querySelectorAll(".item");
  for(let item of items) {
    if(item.classList.contains("editing")) return item;
  }
  return null;
}

//add item template for todo.
function addItem() {
  const item =`<div class="item editing" id="">
        <div class="above">
          <i class="co fa fa-circle-thin" job="complete"></i>
          <input type="text" placeholder="Add a To Do">
          <i class="de fa fa-trash" job="delete"></i>
        </div>
        <div class="middle">
        <input type="text" placeholder="Notes" value="">
        </div>
        <div class="below">
          <div class="addDate">
            <i class="fa fa-keyboard-o"></i>
            <label for="date-select"></label>
            <select name="dates" id="date-select">
              <option value="">Add Date</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div class="addLoc">
            <i class="fa fa-paper-plane"></i>
            <input type="text" placeholder="Add Location">
          </div>
        </div>
      </div>`;
  const postion = "beforeend";
  content.insertAdjacentHTML(postion, item);
  const editing = document.querySelector(".editing");
  const todoInput = editing.querySelector("input").focus();
  // console.log(todoInput === document.activeElement);
}

addItems.addEventListener("click", () => {
  // template item
  let editingItem = returnEditingItem();
  if(editingItem) {
    // do not add a new one, when there is an old template todo
    let input = editingItem.querySelector("input");
    input.focus();
  } else {
    addItem();
  }
});

// if unedited todo exsits, when move focus off if, delete it, or we add a new todo
content.addEventListener("click", (evt) => {
  let editingItem = returnEditingItem();
  let target = evt.target;
  if(editingItem) {
    let input = editingItem.querySelector("input");
    if(input.value) {
      editingItem.classList.toggle("editing");
      input.blur();
      return;
    }
    if(!editingItem.contains(target) && editingItem.classList.contains("editing")) {
      editingItem.parentNode.removeChild(editingItem);
    } else if(editingItem.contains(target) && target.nodeName.toLowerCase() === "div") {
      editingItem.parentNode.removeChild(editingItem);
    }
  } else if(target.classList.contains("content")){
      addItem();
  }
});

header.addEventListener("click", () => {
  let editingItem = returnEditingItem();
  if(editingItem) {
    let input = editingItem.querySelector("input");
    input.focus();
  }
});

// 事件传播机制capturing , bubbling
// todo: edit todo
content.addEventListener("keypress", (evt) => {
  let editingItem = returnEditingItem();
  if(editingItem) {
    let input = editingItem.querySelector("input");
    if(input.value && evt.keyCode == 13) {
      editingItem.classList.toggle("editing");
      input.blur();
    }
  }
});


