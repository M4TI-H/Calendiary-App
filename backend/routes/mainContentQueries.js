import { Router } from "express";
import db from "../server.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const router = Router();
dotenv.config();

router.get("/todo/fetch_todo_lists", async (req, res) => {
  try{
    const authHeader  = req.headers["authorization"];
    if (!authHeader ) {
      return res.status(401).json({ status: "Access token missing." });
    }
    const accessToken = authHeader.split(' ')[1];
    const decodedData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const email = decodedData.email;

    const [data] = await db.query("SELECT todo_list_id, title, create_date, favorite, bookmark FROM user, todo_list WHERE id = user_id AND email = ? ORDER BY create_date DESC", [email]);

    return res.status(200).json({
      status: "Data has been fetched.",
      list: data
    });
  }
  catch (err) {
    console.error(`An error has occured while fetching data: ${err.message}`);
    return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
});

router.post("/todo/add_todo_list", async (req, res) => {
  try {
    const authHeader  = req.headers["authorization"];
    if (!authHeader ) {
      return res.status(401).json({ status: "Access token missing." });
    }
    const accessToken = authHeader.split(' ')[1];
    const decodedData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const email = decodedData.email;

    const [data] = await db.query("SELECT id FROM user WHERE user.email = ?", [email]);
    if (data.length === 0) {
      return res.status(404).json({ status: "User not found." });
    }
    const user_id = data[0].id;
    const { title, dateNow } = req.body;

    const values = [user_id, title, dateNow, false, null]
    const [result] = await db.query(`INSERT INTO todo_list (user_id, title, create_date, favorite, bookmark) VALUES (?)`, [values]);
  
    const [newList] = await db.query(`SELECT * FROM todo_list WHERE todo_list_id = ?`, [result.insertId]);
    return res.status(200).json({ status: "List added", list: newList[0] });
  }
  catch (err) {
    console.error(`An error has occured while posting todo list: ${err.message}`);
    return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
});

router.delete("/todo/remove_list/:list_id", async (req, res) => {
  try{
    await db.query(`DELETE FROM todo_tasks WHERE todo_list_id = ?`, req.params.list_id);

    await db.query(`DELETE FROM todo_list WHERE todo_list_id = ?`, req.params.list_id);
    return res.status(200).json({status: "Task successfully deleted."});
  }
  catch (err) {
      console.error(`An error has occured while deleting a task: ${err.message}`);
      return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
});

router.get("/todo/fetch_tasks/:id", async (req, res) => {
  try{
    const authHeader  = req.headers["authorization"];
    if (!authHeader ) {
      return res.status(401).json({ status: "Access token missing." });
    }
    const accessToken = authHeader.split(' ')[1];
    const decodedData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const values = [decodedData.email, req.params.id];
    const [data] = await db.query("SELECT todo_id, description, due_date, status FROM user, todo_tasks WHERE user.id = user_id AND user.email = ? AND todo_tasks.todo_list_id = ? ORDER BY create_date DESC", values);
    
    return res.status(200).json({
      status: "Data has been fetched.",
      task: data
    });
  }
  catch (err) {
    console.error(`An error has occured while fetching data: ${err.message}`);
    return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
});

router.patch("/todo/update_task", async (req, res) => {
  try{
    const { todo_id, description, due_date, status } = req.body;
    
    const fields = [];
    const values = [];

    if (description !== undefined) {
      fields.push("description = ?");
      values.push(description);
    }
    if (due_date !== undefined) {
      fields.push("due_date = ?");
      values.push(due_date);
    }
    if (status !== undefined) {
      fields.push("status = ?");
      values.push(status);
    }

    values.push();

    await db.query(`UPDATE todo_tasks SET ${fields.join(", ")} WHERE todo_id = ?`, [values, todo_id]);

    return res.status(200).json({status: "Task successfully updated."});
  }
  catch (err) {
      console.error(`An error has occured while updating a task: ${err.message}`);
      return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
});

router.delete("/todo/delete_task/:id", async (req, res) => {
  try{
    await db.query(`DELETE FROM todo_tasks WHERE todo_id = ?`, req.params.id);

    return res.status(200).json({status: "Task successfully deleted."});
  }
  catch (err) {
      console.error(`An error has occured while deleting a task: ${err.message}`);
      return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
})

router.post("/todo/add_task", async (req, res) => {
  try{
    const authHeader  = req.headers["authorization"];
    if (!authHeader ) {
      return res.status(401).json({ status: "Access token missing." });
    }
    const accessToken = authHeader.split(' ')[1];
    const decodedData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const email = decodedData.email;

    const [data] = await db.query("SELECT id FROM user WHERE user.email = ?", [email]);
    if (data.length === 0) {
      return res.status(404).json({ status: "User not found." });
    }

    const user_id = data[0].id;

    let { list_id, description, due_date } = req.body;
    
    if (!due_date || due_date.trim() === "") {
      due_date = null;
    }

    let dateNow = new Date();
    const values = [user_id, list_id, description, due_date, dateNow, false]
    const [result] = await db.query(`INSERT INTO todo_tasks (user_id, todo_list_id, description, due_date, create_date, status) VALUES (?)`, [values]);
    
    const [newTask] = await db.query(`SELECT * FROM todo_tasks WHERE todo_id = ?`, [result.insertId]);
    return res.status(200).json({ status: "Task added", task: newTask[0] });
  }
  catch (err) {
      console.error(`An error has occured while updating a task: ${err.message}`);
      return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
});

export default router;