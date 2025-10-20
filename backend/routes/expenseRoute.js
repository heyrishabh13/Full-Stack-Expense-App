const express = require("express");
const expenseController = require("../controller/expenseController");

const router = express.Router();

router.get("/", expenseController.getAllExpense);
router.post("/", expenseController.addExpense);
router.delete("/:id", expenseController.deleteExpense);
router.put("/:id", expenseController.editExpense);

module.exports = router;
