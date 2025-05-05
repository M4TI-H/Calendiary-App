import { Router } from "express";
import db from "../server.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const router = Router();
dotenv.config();


router.get("/todo/fetch_tasks", async (req, res) => {
  try{
    const authHeader  = req.headers["authorization"];
    if (!authHeader ) {
      return res.status(401).json({ status: "Access token missing." });
    }
    const accessToken = authHeader.split(' ')[1];
    const decodedData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const email = decodedData.email;

    const [data] = await db.query("SELECT todo_id, description, due_date, status FROM user, todo_tasks WHERE user.id = todo_tasks.user_id AND user.email = ? ORDER BY due_date ASC", [email]);

    return res.status(200).json({
      status: "Data has been fetched.",
      task: data
    });
  }
  catch (err) {
      console.error(`An error has occured while fetching data: ${err.message}`);
      return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
})

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

    values.push(todo_id);

    await db.query(`UPDATE todo_tasks SET ${fields.join(", ")} WHERE todo_id = ?`, values);

    return res.status(200).json({status: "Task successfully updated."});
  }
  catch (err) {
      console.error(`An error has occured while updating a task: ${err.message}`);
      return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
})

export default router;