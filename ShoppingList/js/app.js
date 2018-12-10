"use strict";

function addNewItem () {
  let tr = document.querySelector(".item-template");
  tr = tr.cloneNode(true);
  tr.classList.remove("hidden");
  
  let parentTr = document.getElementById("tbody-container");
  parentTr.appendChild(tr);
  
  let itemValue = tr.querySelector(".item-value");
  itemValue.innerHTML = document.getElementById("input-item").value;
  document.getElementById("input-item").value = "";
  
  let itemQuantity = tr.querySelector(".item-quantity");
  itemQuantity.innerHTML = document.getElementById("input-quantity").value;
  document.getElementById("input-quantity").value = "";
  
  let itemShop = tr.querySelector(".item-shop");
  itemShop.innerHTML = document.getElementById("select-shop").value;
  
  function deleteItem () {
    let deleteButton = tr.querySelector(".delete-button");
    deleteButton.addEventListener("click", function(event) {
      event.preventDefault();  
      tr.remove();
    });
  };
  
  function checkItem () {
    let checkbox = tr.querySelector('.item-checkbox');
    checkbox.addEventListener("change", function(event) {
      event.preventDefault();
      let isChecked = checkbox.checked;
      if(isChecked) { 
        tr.classList.add("bg-success");
      } else {
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
    addNewItem();
  });
};

clickAddButton();
