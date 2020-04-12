const addItems = document.querySelector(".addItems");
const content = document.querySelector(".content");
const header = document.querySelector(".header");

function returnTemplateItem() {
  const items = content.querySelectorAll(".item");
  for(let item of items) {
    if(item.classList.contains("template")) return item;
  }
  return null;
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
  // template item
  let templateItem = returnTemplateItem();
  if(templateItem) {
    // do not add a new one, when there is an old template todo
    let input = templateItem.querySelector("input");
    input.focus();
  } else {
    addItemTemplate();
  }
});

// if unedited todo exsits, when move focus off if, delete it, or we add a new todo
content.addEventListener("click", (evt) => {
  let templateItem = returnTemplateItem();
  if(templateItem) {
    let target = evt.target;
      if(!templateItem.contains(target) && templateItem.classList.contains("template")) {
        templateItem.parentNode.removeChild(templateItem);
      } else if(templateItem.contains(target) && target.nodeName.toLowerCase() === "div") {
        templateItem.parentNode.removeChild(templateItem);
      }
    } else {
      addItemTemplate();
    }

});

header.addEventListener("click", () => {
  let templateItem = returnTemplateItem();
  if(templateItem) {
    let input = templateItem.querySelector("input");
    input.focus();
  }
})

// 事件传播机制capturing , bubbling
