import { Router } from "express";
import db from "../server.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const router = Router();
dotenv.config();

router.get("/fetch_bookmarks", async (req, res) => {
  try{
    const authHeader  = req.headers["authorization"];
    if (!authHeader ) {
      return res.status(401).json({ status: "Access token missing." });
    }
    const accessToken = authHeader.split(' ')[1];
    const decodedData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const email = decodedData.email;

    const [data] = await db.query("SELECT bookmark_id, name, icon, color FROM user, bookmarks WHERE id = user_id AND email = ?", [email]);

    return res.status(200).json({
      status: "Data has been fetched.",
      bookmark: data
    });
  }
  catch (err) {
    console.error(`An error has occured while fetching data: ${err.message}`);
    return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
});

export default router;