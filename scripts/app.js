const addItems = document.querySelector(".addItems");
const content = document.querySelector(".content");
const header = document.querySelector(".header");

function checkTemplate() {
  const items = content.querySelectorAll(".item");
  for(let item of items) {
    if(item.classList.contains("template")) return true;
  }
  return false;
}

//add item template for todo.
function addItemTemplate() {
  const item =`<div class="item template">
        <div class="above">
          <i class="co fa fa-circle-thin" job="complete" id="0"></i>
          <input type="text" placeholder="Add a To Do" id="0">
          <i class="de fa fa-trash" job="delete" id="0"></i>
        </div>
        <div class="middle">
        <input type="text" placeholder="Notes">
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
            <input type="text" placeholder="Add Location" id="addLoc">
          </div>
        </div>
      </div>`;
  const postion = "beforeend";
  content.insertAdjacentHTML(postion, item);
  const template = document.querySelector(".template");
  const todoInput = template.querySelector("input").focus();
  // console.log(todoInput === document.activeElement);
}

addItems.addEventListener("click", () => {
  if(checkTemplate()) {
    // do not add a new one, when there is an old template todo
    const items = content.querySelectorAll(".item");
    for(let item of items) {
      if(item.classList.contains("template")) {
        item.focus();
        return;
      }
    }
  } else {
    addItemTemplate();
  }
});


// when move focus off the unedited item, delete it
content.addEventListener("click", (evt) => {
  let target = evt.target;
  // console.log('target.type', target, target.nodeName);
  // evt.preventDefault();
  const items = document.querySelectorAll(".item");
  for(let item of items) {
    if(!item.contains(target) && item.classList.contains("template")) {
      item.parentNode.removeChild(item);
    } else if(item.contains(target) && target.nodeName.toLowerCase() === "div") {
      item.parentNode.removeChild(item);
    }
  }
});

// header.addEventListener("click", )



// 事件传播机制capturing , bubbling
