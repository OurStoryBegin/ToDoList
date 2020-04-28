const addItems = document.querySelector(".addItems");
const content = document.querySelector(".content");
const header = document.querySelector(".header");
const total = document.querySelector(".total");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINETHROUGH = "line-through";


let TODOS;
let preItem = null;

let todos = localStorage.getItem("TODOS");
if(todos) {
  TODOS = JSON.parse(todos);
  console.log(TODOS);
  loadTodos(TODOS);
} else {
  TODOS = [];
}

function loadTodos(arr) {
  arr.forEach(item => {
    if(!item.done) addItem(item.id, item.todo);
  });
}


function countTodos(element, arr) {
  let finished = 0;
  for(let tmp of arr) {
    if(!tmp.done) finished++;
  }
  element.innerHTML = finished;
}

function returnEditingItem() {
  const items = content.querySelectorAll(".item");
  for(let item of items) {
    if(item.classList.contains("editing")) return item;
  }
  return null;
}

//add item template for todo.
function addItem(id, todo='', done=false) {
    const item =
        `<div class="item editing" id="${id}">
<i class="co fa fa-circle-thin" job="complete"></i>
<input type="text" placeholder="Add a To Do" value=${todo}>
</div>`;

  const postion = "beforeend";
  content.insertAdjacentHTML(postion, item);
  const editing = document.querySelector(".editing");
  const todoInput = editing.querySelector("input").focus();
  return editing;

}

addItems.addEventListener("click", () => {
  let editingItem = returnEditingItem();
  if(editingItem) {
    // do not add a new one, when there is an old template todo
    let input = editingItem.querySelector("input");
    let todo = input.value;
    if(todo) {
      editingItem.classList.toggle("editing");
      let id = parseInt(editingItem.getAttribute("id"));
      TODOS[id] = {
        todo: todo,
        id: id,
        done: false,
      };
      input.blur();
      countTodos(total, TODOS);
      localStorage.setItem("TODOS", JSON.stringify(TODOS));
      preItem = addItem(TODOS.length);
    } else {
      input.focus();
    }
  } else {
    preItem = addItem(TODOS.length);
  }
});

// if unedited todo exsits, when move focus off if, delete it, or we add a new todo
content.addEventListener("click", (evt) => {
  let target = evt.target;
  const items = content.querySelectorAll(".item");
  for(let item of items) {
    if(item.contains(document.activeElement)) {
      if(!item.classList.contains("editing")) item.classList.toggle("editing");
    } else if(item.classList.contains("editing")) {
      // last todo
      preItem = item;
      item.classList.toggle("editing");
    }
  }
  if(preItem && !preItem.contains(target)) {
    let todo = preItem.querySelector("input").value;
    if(!todo) {
      preItem.parentNode.removeChild(preItem);
      preItem = null;
      return;
    }
    let id = parseInt(preItem.getAttribute("id"));
    TODOS[id] = {
      todo: todo,
      id: id,
      done: false,
    };
    countTodos(total, TODOS);
    localStorage.setItem("TODOS", JSON.stringify(TODOS));
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
      TODOS[id] = {
        todo: input.value,
        id: id,
        done: false,
      };
      countTodos(total, TODOS);
      localStorage.setItem("TODOS", JSON.stringify(TODOS));
      addItem(TODOS.length);
      preItem = null;
    }
  }
});

// done  a todo, then delete it
content.addEventListener("click", (evt) => {
  let target = evt.target;
  if(target.getAttribute("job") === "complete") {
    let input = target.nextElementSibling;
    if(input.value) {
      target.classList.toggle("fa-circle-thin");
      target.classList.toggle("fa-check-circle");
      input.classList.toggle("line-through");
      let id = target.parentNode.getAttribute("id");
      TODOS[id].done = true;
      localStorage.setItem("TODOS", JSON.stringify(TODOS));
      target.parentNode.parentNode.removeChild(target.parentNode);
      countTodos(total, TODOS);
    }
  }
});

