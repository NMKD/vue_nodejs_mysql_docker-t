const { Router } = require("express");
const Todo = require("../models/tutorial.model");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(201).json({
      todos: todos.map((v) => ({
        ...v.dataValues,
      })),
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "MySQL Server erorr",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      done: false,
      date: Date.now(),
    });
    res.status(201).json({ todo });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "MySQL Server erorr",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    todo.done = req.body.done;
    await todo.save();
    res.status(200).json({ todo });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "MySQL Server erorr",
    });
  }
});
// res 204 - когда произошли изменения, но ничего возвращать не нужно
router.delete("/:id", async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        id: req.params.id,
      },
    });
    await todos[0].destroy();
    res.status(204).json({})
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "MySQL Server erorr",
    });
  }
});

module.exports = router;
