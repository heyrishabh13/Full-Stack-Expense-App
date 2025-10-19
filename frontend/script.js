window.addEventListener("DOMContentLoaded", initialize);

async function initialize() {
  try {
    const res = await axios.get("http://localhost:3000/expense");
    const expenses = res.data;
    expenses.forEach((expense) => display(expense));
    localStorage.removeItem("expenseId");
  } catch (error) {
    alert(error.message);
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;

  const obj = {
    amount,
    description,
    category,
  };

  try {
    const expenseId = localStorage.getItem("expenseId");
    if (expenseId) {
      console.log(expenseId);
      updateExpense(expenseId, obj);
    } else {
      let res = await axios.post("http://localhost:3000/expense", obj);

      display(res.data);
    }
  } catch (error) {
    alert(error.message);
  }
}

function display(data) {
  let ul = document.querySelector("ul");
  let li = document.createElement("li");

  li.id = data.id;

  li.textContent =
    data.id +
    " - " +
    data.amount +
    " - " +
    data.description +
    " - " +
    data.category;
  ul.appendChild(li) + " - ";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => handleDeleteExpense(data.id, li));
  li.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => handleEditExpense(data));
  li.appendChild(editBtn);
}

async function handleDeleteExpense(id, li) {
  await axios.delete(`http://localhost:3000/expense/${id}`);
  li.remove();
}

function handleEditExpense({ id, amount, description, category }) {
  const amountInput = document.getElementById("amount");
  const descriptionInput = document.getElementById("description");
  const categoryInput = document.getElementById("category");

  localStorage.setItem("expenseId", id);

  amountInput.value = amount;
  descriptionInput.value = description;
  categoryInput.value = category;
}

async function updateExpense(expenseId, obj) {
  try {
    const res = await axios.put(
      `http://localhost:3000/expense/${expenseId}`,
      obj
    );
    alert(res.data);
    const id = expenseId;
    updateLiTag(id, obj);
    localStorage.removeItem("expenseId");
  } catch (error) {
    alert(error.message);
  }
}

function updateLiTag(id, obj) {
  let li = document.getElementById(id);
  li.firstChild.textContent =
    obj.id + " - " + obj.amount + " - " + obj.description + " - ";
}
