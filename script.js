const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");

// creating todo
function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Please add an item");
    return;
  }
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);
  itemList.appendChild(li);
  itemInput.value = "";
}

// creating buttons
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

// creating icons
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// removing to do
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
  }
}

// clearing all of to do's
function clearItem() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}

const onFocus = () => {
  console.log("Input is focused");
  itemInput.style.outlineStyle = "none";
  itemInput.style.outlineWidth = "1px";
  itemInput.style.outlineColor = "gray";
  itemInput.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
};

const onBlur = () => {
  console.log("Input is focused");
  itemInput.style.boxShadow = "none";
};

//! addEventListeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItem);
itemInput.addEventListener("focus", onFocus);
itemInput.addEventListener("blur", onBlur);
