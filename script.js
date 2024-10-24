var selectedRow = null;
var newSerialNo = 1;
const allInputFields = [
  "username",
  "productCode",
  "productName",
  "productPrice",
  "productQuantity",
  "sellerEmail",
];

const inputProductFields = [
  "productCode",
  "productName",
  "productPrice",
  "productQuantity",
  "sellerEmail",
];
const allowedKeys = [
  "Backspace",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Delete",
  "Tab",
];

allInputFields.forEach((id) => {
  const element = document.getElementById(id);

  element.addEventListener("keydown", function (e) {
    if (this.value.length === 0 && e.code === "Space") {
      e.preventDefault();
    } else if (this.value.length > 5 && !allowedKeys.includes(e.code)) {
      e.preventDefault();
    }
  });
});

window.onload = () => {
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

const onLoginSubmit = (e) => {
  e.preventDefault();
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
};

const onLogout = () => {
  localStorage.removeItem("isLoggedIn");
  location.reload();
  showToast("logout Successful!", "success");
};

const onFormSubmit = (event) => {
  event.preventDefault();
  var formData = readFormData();
  var isValid = validateForm(formData);

  if (isValid === true) {
    if (selectedRow === null) {
      formData.newSerialNo = newSerialNo++;
      console.log("Serial Numbar", formData.newSerialNo);
      insertNewRecord(formData);
      showToast("Form submitted successfully!", "success");
    } else {
      updateRecord(formData);
      showToast("Form updated successfully!", "success");
    }
    resetForm();
    saveTableData();
    // location.reload();
  } else {
    showToast(
      "Form submission failed. please recheck the required fields.",
      "error"
    );
  }
};

// const inputProductFields = [
//   "productCode",
//   "productName",
//   "productPrice",
//   "productQuantity",
//   "sellerEmail",
// ];

const readFormData = () => {
  var formData = {};
  // formData["newSerialNo"] = document.getElementById("newSerialNo").value;
  inputProductFields.forEach(
    (field) => (formData[field] = document.getElementById(field).value)
  );
  return formData;
};

const insertNewRecord = (data) => {
  var table = document
    .getElementById("storedList")
    .getElementsByTagName("tbody")[0];

  var newRow = table.insertRow(table.length);

  var cell0 = newRow.insertCell(0);
  cell0.innerHTML = data.newSerialNo;

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
};

const onEdit = (td) => {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("newSerialNo").value = selectedRow.cells[0].innerHTML;
  inputProductFields.forEach((field, index) => {
    document.getElementById(field).value =
      selectedRow.cells[index + 1].innerHTML;
  });
};

const updateRecord = (formData) => {
  inputProductFields.forEach((field, index) => {
    selectedRow.cells[index + 1].innerHTML = formData[field];
  });
  saveTableData();
};

const onDelete = (td) => {
  if (confirm("Do you want to delete this record?")) {
    row = td.parentElement.parentElement;
    document.getElementById("storedList").deleteRow(row.rowIndex);
    saveTableData();
    adjustSerialNumbers();
  }
  resetForm();
};

const adjustSerialNumbers = () => {
  var table = document
    .getElementById("storedList")
    .getElementsByTagName("tbody")[0];
  var rows = table.rows;

  var lastSerialNo =
    rows.length > 0 ? parseInt(rows[rows.length - 1].cells[0].innerHTML) : 0;
  newSerialNo = lastSerialNo + 1;
  saveTableData();
};

// Reset form
const resetForm = () => {
  document.getElementById("newSerialNo").value = "";
  inputProductFields.map(
    (field) => (document.getElementById(field).value = "")
  );
  selectedRow = null;
};

// Validate form
const validateForm = (data) => {
  if (
    data.productCode.trim().length > 0 &&
    data.productPrice.trim().length > 0 &&
    data.productQuantity.trim().length > 0 &&
    data.sellerEmail.trim().length > 0
  ) {
    return true;
  } else {
    return false;
  }
};

const showToast = (message, type) => {
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
};

const saveTableData = () => {
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
  localStorage.setItem("tableData", JSON.stringify(data));
};

const loadTableData = () => {
  var tableData = localStorage.getItem("tableData");
  if (tableData) {
    var data = JSON.parse(tableData);
    data.forEach(function (item) {
      insertNewRecord(item);
    });
    newSerialNo = parseInt(data[data.length - 1].newSerialNo) + 1;
  }
};
