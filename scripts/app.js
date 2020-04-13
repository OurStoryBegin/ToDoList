const addItems = document.querySelector(".addItems");
const content = document.querySelector(".content");
const header = document.querySelector(".header");
const total = document.querySelector(".total");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINETHROUGH = "line-through";


let TODOS = [];
let preElemTodo = null;

function countTodos(element, arr) {
  let finished = 0;
  for(let tmp of arr) {
    if(tmp.done) finished++;
  }
  element.innerHTML = `${finished}/${arr.length}`;
}

function returnEditingItem() {
  const items = content.querySelectorAll(".item");
  for(let item of items) {
    if(item.classList.contains("editing")) return item;
  }
  return null;
}

//add item template for todo.
function addItem(id) {
  const item =`<div class="item editing" id="${id}">
        <div class="above">
          <i class="co fa fa-circle-thin" job="complete"></i>
          <input type="text" placeholder="Add a To Do">
          <i class="de fa fa-trash" job="delete"></i>
        </div>
        <div class="middle">
        <input type="text" placeholder="Notes" value="" class="line-through">
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
            <input type="text" placeholder="Add Location" value="">
          </div>
        </div>
      </div>`;
  const postion = "beforeend";
  content.insertAdjacentHTML(postion, item);
  const editing = document.querySelector(".editing");
  const todoInput = editing.querySelector("input").focus();
  return editing;
}

addItems.addEventListener("click", () => {
  // template item
  let editingItem = returnEditingItem();
  if(editingItem) {
    // do not add a new one, when there is an old template todo
    let input = editingItem.querySelector("input");
    let todo = input.value;
    if(todo) {
      editingItem.classList.toggle("editing");
      let id = parseInt(editingItem.getAttribute("id"));
      let notes = editingItem.querySelector(".middle input").value;
      let date = editingItem.querySelector("#date-select").value;
      let loc = editingItem.querySelector(".addLoc input").value;
      // console.log("itemInfo: ", todo, id, false,  notes, date, loc);
      TODOS[id] = {
        todo: todo,
        id: id,
        done: false,
        notes: notes,
        date: date,
        loc: loc
      };
      countTodos(total, TODOS);
      preItem = addItem(TODOS.length);
      input.blur();
    } else {
      input.focus();
    }
  } else {
    preItem = addItem(TODOS.length);
  }
});

let preItem = null;
// if unedited todo exsits, when move focus off if, delete it, or we add a new todo
content.addEventListener("click", (evt) => {
  let target = evt.target;
  const items = content.querySelectorAll(".item");
  for(let item of items) {
    if(item.contains(document.activeElement)) {
      if(!item.classList.contains("editing")) item.classList.toggle("editing");
    } else if(item.classList.contains("editing")) {
      preItem = item;
      item.classList.toggle("editing");
    }
  }
  // console.log(preItem);
  // preItem = returnEditingItem();
  // console.log('bool:', preItem && !preItem.contains(target));
  if(preItem && !preItem.contains(target)) {
    let todo = preItem.querySelector(".above input").value;
    if(!todo) {
      preItem.parentNode.removeChild(preItem);
      preItem = null;
      return;
    }
    let id = parseInt(preItem.getAttribute("id"));
    let notes = preItem.querySelector(".middle input").value;
    let date = preItem.querySelector("#date-select").value;
    let loc = preItem.querySelector(".addLoc input").value;
    // console.log("itemInfo: ", todo, id, false,  notes, date, loc);
    TODOS[id] = {
      todo: todo,
      id: id,
      done: false,
      notes: notes,
      date: date,
      loc: loc
    };
    countTodos(total, TODOS);
    if(preItem.classList.contains("editing")) {
      preItem.classList.toggle("editing");
    }
    preItem = null;
    return;
  } else if(!preItem && target.classList.contains("content")){
    preItem = addItem(TODOS.length);
  }
});

//when mouse move in header, keep focus editing item
header.addEventListener("click", () => {
  let editingItem = returnEditingItem();
  if(editingItem) {
    let input = editingItem.querySelector("input");
    input.focus();
  }
});

// todo: edit todo
content.addEventListener("keypress", (evt) => {
  let editingItem = returnEditingItem();
  if(editingItem) {
    let input = editingItem.querySelector("input");
    if(input.value && evt.keyCode == 13) {
      editingItem.classList.toggle("editing");
      input.blur();
      let id = parseInt(editingItem.getAttribute("id"));
      let done = false;
      let notes = editingItem.querySelector(".middle input").value;
      let date = editingItem.querySelector("#date-select").value;
      let loc = editingItem.querySelector(".addLoc input").value;
      TODOS[id] = {
        todo: input.value,
        id: id,
        done: done,
        notes: notes,
        date: date,
        loc: loc
      };
      countTodos(total, TODOS);
      addItem(TODOS.length);
    }
  }
});

// done  a todo
content.addEventListener("click", (evt) => {
  let target = evt.target;
  if(target.getAttribute("job") === "complete") {
    target.classList.toggle("fa-circle-thin");
    target.classList.toggle("fa-check-circle");
    target.nextElementSibling.classList.toggle("line-through");
    let item = target.parentNode.parentNode;
    let id = item.getAttribute("id");
    TODOS[id].done = true;
    countTodos(total, TODOS);
  }
});

// delete a todo
content.addEventListener("click", (evt) => {
  let target = evt.target;
  if(target.getAttribute("job") === "delete") {
    let item = target.parentNode.parentNode;
    let id = item.getAttribute("id");
    item.parentNode.removeChild(item);
    TODOS.splice(id, 1);
    countTodos(total, TODOS);
    // correct index of todos in TODOS
    for(let i = 0; i < TODOS.length; i++) {
      TODOS[i].id = i;
    }
  }
})