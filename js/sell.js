var checkBoxes = document.querySelectorAll(".check");
var inputNumbers = document.querySelectorAll('input[type="number"]');
var filter = document.querySelector("#filter");
var rows = document.querySelectorAll("tbody tr");
var total = document.querySelector("#total");

for (var i = 0; i < checkBoxes.length; i++) {
  checkBoxes[i].onchange = function () {
    for (var j = 0; j < inputNumbers.length; j++) {
      inputNumbers[j].disabled = !checkBoxes[j].checked;
      updateRowTotal(rows[j]);
    }
    updateTotal();
  };
}

filter.onchange = function () {
  rows.forEach((row) => {
    var cell = parseInt(row.children[2].innerHTML);
    var checkBox = checkBoxes[row.rowIndex - 1];
    var quantityInput = row.querySelector('input[type="number"]');

    if (filter.value == 1) {
      row.style.display = cell ? "table-row" : "none";
    } else if (filter.value == 2) {
      row.style.display = cell < 50 ? "table-row" : "none";
    } else if (filter.value == 3) {
      row.style.display = cell >= 50 && cell <= 80 ? "table-row" : "none";
    } else if (filter.value == 4) {
      row.style.display = cell >= 80 && cell <= 100 ? "table-row" : "none";
    } else if (filter.value == 5) {
      row.style.display = cell > 100 ? "table-row" : "none";
    }
    if (row.style.display === "none") {
      checkBox.checked = false;
      quantityInput.value = 0;
    }

    updateRowTotal(row);
  });
  updateTotal();
};

rows.forEach((row, index) => {
  var quantityInput = row.querySelector('input[type="number"]');
  var price = parseInt(row.children[2].innerHTML);
  var showMoney = row.lastElementChild;

  quantityInput.addEventListener("input", function (e) {
    var quantity = parseInt(e.target.value);
    if (quantity < 0) {
      e.target.value = 0;
      quantity = 0;
    }

    showMoney.innerHTML = checkBoxes[index].checked ? price * quantity : "null";
    updateTotal();
  });
  checkBoxes[index].addEventListener("change", function () {
    updateRowTotal(row);
    updateTotal();
  });
});

function updateRowTotal(row) {
  var quantityInput = row.querySelector('input[type="number"]');
  var checkBox = checkBoxes[row.rowIndex - 1];
  var price = parseInt(row.children[2].innerHTML);
  var showMoney = row.lastElementChild;
  var quantity = parseInt(quantityInput.value);

  if (!checkBox.checked) {
    quantityInput.value = 0;
    quantity = 0;
  } else if (quantity < 0) {
    quantityInput.value = 0;
    quantity = 0;
  }
  showMoney.innerHTML = checkBox.checked ? price * quantity : "";
  updateTotal();
}
function updateTotal() {
  var sum = 0;
  rows.forEach((row, index) => {
    var checkBox = checkBoxes[index];
    if (checkBox.checked && row.style.display !== "none") {
      var quantityInput = row.querySelector('input[type="number"]');
      var price = parseInt(row.children[2].innerHTML);
      var quantity = parseInt(quantityInput.value);
      sum += price * quantity;
    }
  });
  total.innerHTML = "$ " + sum;
}
