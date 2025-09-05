const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

//! creating todo
function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "" && newItem === " ") {
    alert("Please add an item");
    return;
  }
  //? Create item DOM Element
  addItemToDOM(newItem);

  //? add item to localStorage
  addItemToStorage(newItem);
  itemInput.value = "";
}

//! adding to DOM storage
function addItemToDOM(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);

  // adding li to the dom
  itemList.appendChild(li);
}

//! creating buttons
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

//! creating icons
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

//! adding to local storage
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  //? add new item to array
  itemsFromStorage.push(item);

  //? Convert to JSON String and set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

//! removing to do
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure to delete todo?")) {
      e.target.parentElement.parentElement.remove();

      checkUI();
    }
  }
}

//! clearing all of to do's
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
}

//! when clicked to do item input it shows shadow
const onFocus = () => {
  itemInput.style.outlineStyle = "none";
  itemInput.style.outlineWidth = "1px";
  itemInput.style.outlineColor = "gray";
  itemInput.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
};

//! when blurred to item input it not shows shadow
const onBlur = () => {
  itemInput.style.boxShadow = "none";
};

//! filtering to do's
function filterItems(e) {
  const items = document.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    itemFilter.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    itemFilter.style.display = "block";
    clearBtn.style.display = "block";
  }
}

//! Initialize app
function init() {
  //! addEventListeners
  itemList.addEventListener("click", removeItem);
  itemForm.addEventListener("submit", onAddItemSubmit);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  itemInput.addEventListener("focus", onFocus);
  itemInput.addEventListener("blur", onBlur);
  document.addEventListener("DOMContentLoaded", displayItems);
  checkUI();
}

init();
