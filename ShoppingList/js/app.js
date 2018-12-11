"use strict";

let data = [];

function addNewItem (title, quantity, shop, done) {
  let tr = document.querySelector(".item-template");
  tr = tr.cloneNode(true);
  tr.classList.remove("hidden");
  
  let parentTr = document.getElementById("tbody-container");
  parentTr.appendChild(tr);
  
  let itemValue = tr.querySelector(".item-value");
  itemValue.innerHTML = title;
  document.getElementById("input-item").value = "";
  
  let itemQuantity = tr.querySelector(".item-quantity");
  itemQuantity.innerHTML = quantity;
  document.getElementById("input-quantity").value = "";
  
  let itemShop = tr.querySelector(".item-shop");
  itemShop.innerHTML = shop;
  
  if (done) {
    tr.classList.add("bg-success");
    tr.querySelector(".item-checkbox").checked = true;
  }
  
  function deleteItem () {
    let deleteButton = tr.querySelector(".delete-button");
    deleteButton.addEventListener("click", function(event) {
      event.preventDefault();  
      let trIndex = tr.rowIndex;
      data.splice(trIndex - 2, 1);
      localStorage.setItem("data", JSON.stringify(data));
      tr.remove();
    });
  };
  
  function checkItem () {
    let checkbox = tr.querySelector('.item-checkbox');
    checkbox.addEventListener("change", function(event) {
      event.preventDefault();
      let isChecked = checkbox.checked;
      let trIndex = tr.rowIndex;
      if(isChecked) { 
        tr.classList.add("bg-success");
        data[trIndex - 2].done = true;
        localStorage.setItem("data", JSON.stringify(data));
      } else {
        data[trIndex - 2].done = false;
        localStorage.setItem("data", JSON.stringify(data));
        tr.classList.remove("bg-success");
      }
    });
  };
  
  checkItem();
  deleteItem();
};

function clickAddButton () {
  let addButton = document.getElementById("add-button");
  addButton.addEventListener("click", function (event) {
    event.preventDefault();

    let title = document.getElementById("input-item").value;
    let quantity = document.getElementById("input-quantity").value;
    let shop = document.getElementById("select-shop").value;
    let done = false;

    data.push({
      value: title,
      quantity: quantity,
      shop: shop,
      done: done
    });
    localStorage.setItem("data", JSON.stringify(data));

    addNewItem(title, quantity, shop, done);
  });
};

clickAddButton();

let j = localStorage.getItem("data");
if (j) {
  data = JSON.parse(j);
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    addNewItem(item.value, item.quantity, item.shop, item.done);
  }
}
