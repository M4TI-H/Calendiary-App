import { Router } from "express";
import db from "../server.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const router = Router();
dotenv.config();

router.get("/fetch_notes", async (req, res) => {
  try{
    const authHeader  = req.headers["authorization"];
    if (!authHeader ) {
      return res.status(401).json({ status: "Access token missing." });
    }
    const accessToken = authHeader.split(' ')[1];
    const decodedData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const email = decodedData.email;

    const [data] = await db.query("SELECT note_id, content, create_date, bookmark, color FROM user, notes WHERE id = user_id AND email = ? ORDER BY create_date DESC", [email]);

    return res.status(200).json({
      status: "Data has been fetched.",
      note: data
    });
  }
  catch (err) {
    console.error(`An error has occured while fetching data: ${err.message}`);
    return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
});


router.delete("/remove_note/:note_id", async (req, res) => {
  try{
    await db.query(`DELETE FROM notes WHERE note_id = ?`, req.params.note_id);
    return res.status(200).json({status: "Note successfully deleted."});
  }
  catch (err) {
      console.error(`An error has occured while deleting a note: ${err.message}`);
      return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
});

router.get("/fetch_recent_notes", async (req, res) => {
  try{
    const authHeader  = req.headers["authorization"];
    if (!authHeader ) {
      return res.status(401).json({ status: "Access token missing." });
    }
    const accessToken = authHeader.split(' ')[1];
    const decodedData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const email = decodedData.email;

    const [data] = await db.query("SELECT note_id, content, create_date, bookmark, color FROM user, notes WHERE id = user_id AND email = ? ORDER BY create_date DESC LIMIT 3", [email]);

    return res.status(200).json({
      status: "Data has been fetched.",
      note: data
    });
  }
  catch (err) {
    console.error(`An error has occured while fetching data: ${err.message}`);
    return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
});

router.patch("/edit_note", async (req, res) => {
  try{
    const { note_id, content } = req.body;

    await db.query(`UPDATE notes SET content = ? WHERE note_id = ?`, [content, note_id]);

    return res.status(200).json({status: "Note successfully edited."});
  }
  catch (err) {
      console.error(`An error has occured while editing a note: ${err.message}`);
      return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
});

router.post("/add_note", async (req, res) => {
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
    const { content, dateNow } = req.body;

    const colors = ["#2A9D8F", "#E9C46A", "#F4A261", "#E76F51", "#669BBC", "#9d4edd", "#5a189a", "#ec0868"];
    let color = colors[Math.floor(Math.random() * colors.length)];

    const values = [user_id, content, dateNow, null, color];
    const [result] = await db.query(`INSERT INTO notes (user_id, content, create_date, bookmark, color) VALUES (?)`, [values]);
  
    const [newNote] = await db.query(`SELECT * FROM notes WHERE note_id = ?`, [result.insertId]);
    return res.status(200).json({ status: "Note created", note: newNote[0] });
  }
  catch (err) {
    console.error(`An error has occured while creating a note: ${err.message}`);
    return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
});

export default router;