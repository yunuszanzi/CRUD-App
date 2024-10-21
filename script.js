var selectedRow = null;
var newSerialNo = 0;
window.onload = function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("productForm").style.display = "block";
  } else {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("productForm").style.display = "none";
  }
  loadTableData();
};
function onFormSubmit(e) {
  event.preventDefault();
  var formData = readFormData();
  var isValid = validateForm(formData);

  if (isValid === true) {
    if (selectedRow === null) {
      insertNewRecord(formData);
      showToast("Form submitted successfully!", "success");
    } else {
      updateRecord(formData);
      showToast("Form updated sucessfully!", "success");
    }
    resetForm();
    saveTableData();
  } else {
    showToast(
      "Form submission failed. please recheck the required fields.",
      "error"
    );
  }
}

function readFormData() {
  var formData = {};
  formData["newSerialNo"] = document.getElementById("newSerialNo").value;
  formData["productCode"] = document.getElementById("productCode").value;
  formData["productName"] = document.getElementById("productName").value;
  formData["productPrice"] = document.getElementById("productPrice").value;
  formData["productQuantity"] =
    document.getElementById("productQuantity").value;
  formData["sellerEmail"] = document.getElementById("sellerEmail").value;
  return formData;
}

function insertNewRecord(data) {
  var table = document
    .getElementById("storedList")
    .getElementsByTagName("tbody")[0];

  newSerialNo = newSerialNo + 1;

  var newRow = table.insertRow(table.length);

  // Insert the serial number in the first cell
  var cell0 = newRow.insertCell(0);
  cell0.innerHTML = newSerialNo;

  var cell1 = newRow.insertCell(1);
  cell1.innerHTML = data.productCode;

  var cell2 = newRow.insertCell(2);
  cell2.innerHTML = data.productName;

  var cell3 = newRow.insertCell(3);
  cell3.innerHTML = data.productPrice;

  var cell4 = newRow.insertCell(4);
  cell4.innerHTML = data.productQuantity;

  var cell5 = newRow.insertCell(5);
  cell5.innerHTML = data.sellerEmail;

  var cell6 = newRow.insertCell(6);
  cell6.innerHTML = `<button class='edit-btn' onClick='onEdit(this)'>Edit</button> 
                     <button class='delete-btn' onClick='onDelete(this)'>Delete</button>`;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  
  document.getElementById("newSerialNo").value = selectedRow.cells[0].innerHTML;
  document.getElementById("productCode").value = selectedRow.cells[1].innerHTML;
  document.getElementById("productName").value = selectedRow.cells[2].innerHTML;
  document.getElementById("productPrice").value =
    selectedRow.cells[3].innerHTML;
  document.getElementById("productQuantity").value =
    selectedRow.cells[4].innerHTML;
  document.getElementById("sellerEmail").value = selectedRow.cells[5].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.newSerialNo;
  selectedRow.cells[1].innerHTML = formData.productCode;
  selectedRow.cells[2].innerHTML = formData.productName;
  selectedRow.cells[3].innerHTML = formData.productPrice;
  selectedRow.cells[4].innerHTML = formData.productQuantity;
  selectedRow.cells[5].innerHTML = formData.sellerEmail;
  saveTableData();
}

function onDelete(td) {
  if (confirm("Do you want to delete this record?")) {
    row = td.parentElement.parentElement;
    document.getElementById("storedList").deleteRow(row.rowIndex);
    saveTableData();
  }
  resetForm();
}

function resetForm() {
  document.getElementById("productCode").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productQuantity").value = "";
  document.getElementById("sellerEmail").value = "";
}

function validateForm(data) {
  if (
    data.productCode.trim().length > 0 &&
    data.productPrice.trim().length > 0 &&
    data.productQuantity.trim().length > 0 &&
    data.sellerEmail.trim() !== ""
  ) {
    return true;
  } else {
    return false;
  }
}
function showToast(message, type) {
  var toast = document.getElementById("toast");
  toast.innerHTML = message;

  if (type === "success") {
    toast.style.backgroundColor = "#4CAF50";
  } else {
    toast.style.backgroundColor = "#f44336";
  }

  toast.className = "toast show";

  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

function resetNotification() {
  showToast("Form reset successfully.", "success");
}

function onLogout() {
  localStorage.removeItem("isLoggedIn");
  location.reload();
  showToast("logout Successful!", "success");
}

function onLoginSubmit(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "yunus" && password === "12345") {
    localStorage.setItem("isLoggedIn", "true");
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("productForm").style.display = "block";
    showToast("Login successful!", "success");
  } else {
    showToast("Invalid credentials, please try again.", "error");
  }
}

// Prevent space as the first character for specific input fields
document.getElementById("username").addEventListener("keydown", function (e) {
  if (this.value.length === 0 && e.code === "Space") {
    e.preventDefault();
  }
});
document
  .getElementById("productCode")
  .addEventListener("keydown", function (e) {
    if (this.value.length === 0 && e.code === "Space") {
      e.preventDefault();
    }
  });

document
  .getElementById("productName")
  .addEventListener("keydown", function (e) {
    if (this.value.length === 0 && e.code === "Space") {
      e.preventDefault();
    }
  });

document
  .getElementById("productPrice")
  .addEventListener("keydown", function (e) {
    if (this.value.length === 0 && e.code === "Space") {
      e.preventDefault();
    }
  });

document
  .getElementById("productQuantity")
  .addEventListener("keydown", function (e) {
    if (this.value.length === 0 && e.code === "Space") {
      e.preventDefault();
    }
  });

document
  .getElementById("sellerEmail")
  .addEventListener("keydown", function (e) {
    if (this.value.length === 0 && e.code === "Space") {
      e.preventDefault();
    }
  });
function saveTableData() {
  var table = document
    .getElementById("storedList")
    .getElementsByTagName("tbody")[0];
  var rows = table.rows;
  var data = [];

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var rowData = {
      newSerialNo: row.cells[0].innerHTML,
      productCode: row.cells[1].innerHTML,
      productName: row.cells[2].innerHTML,
      productPrice: row.cells[3].innerHTML,
      productQuantity: row.cells[4].innerHTML,
      sellerEmail: row.cells[5].innerHTML,
    };
    data.push(rowData);
  }

  localStorage.setItem("tableData", JSON.stringify(data)); // Save table data as a JSON string
}

function loadTableData() {
  var tableData = localStorage.getItem("tableData");
  if (tableData) {
    var data = JSON.parse(tableData);
    data.forEach(function (item) {
      insertNewRecord(item);
    });
  }
}
