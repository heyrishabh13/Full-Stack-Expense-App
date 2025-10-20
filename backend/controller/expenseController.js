const Expense = require("../models/expense");
const sequelize = require("../utils/db-connection");

const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    if (!expense) {
      res.status(404).send("Expense not found");
    }
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllExpense = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    if (!expenses) {
      res.status(404).send("Expenses not found");
    }
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const expense = await Expense.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send(`Expense with id: ${id} deleted successfully.`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const { amount, description, category } = req.body;
    const expense = await Expense.findByPk(id);
    expense.amount = amount;
    expense.description = description;
    expense.category = category;
    expense.save();
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addExpense,
  editExpense,
  getAllExpense,
  deleteExpense,
};
