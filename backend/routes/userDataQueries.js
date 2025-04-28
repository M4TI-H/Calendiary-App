import { Router } from "express";
import db from "../server.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const router = Router();
dotenv.config();

router.get("/get_user_data", async (req, res) => {
  try{
    const authHeader  = req.headers["authorization"];
    if (!authHeader ) {
      return res.status(401).json({ status: "Access token missing." });
    }
    const accessToken = authHeader.split(' ')[1];
    const decodedData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const email = decodedData.email;

    const [data] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
      
    if (data.length === 0) {
      return res.status(404).json({ status: "User not found." });
    }

    const userData = data[0];
    delete userData.password;

    return res.status(200).json({
      status: "Data has been fetched.",
      user: userData
    });
  }
  catch (err) {
      console.error(`An error has occured while fetching data: ${err.message}`);
      return res.status(500).json({ status: "Internal Server Error", error: err.message });
  }
})

export default router;