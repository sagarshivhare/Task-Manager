import express from "express";
import Todo from "../models/todo.model.js";

const router = express.Router();

// get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add a new todo
router.post("/", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  try {
    const newTodo = await todo.save();
    res.status(200).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//update a todo
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "todo not found" });

    if (req.body.text !== undefined) {
      todo.text = req.body.text;
    }

    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete a todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "todo deleted" });

  } catch (err) {
    res.send(500).json({ message: err.message });
  }
});

export default router;
