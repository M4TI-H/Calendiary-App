import { Router } from "express";
import { validationResult, body } from "express-validator";
import db from "../server.js";

const router = Router();

router.post("/register", 
    body('email').isEmail().notEmpty(),
    body('password').isLength({ min: 6 }).notEmpty(),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ status: "Register validation errors", errors: result.array() });
    }

    const {email, password} = req.body;
    const values = [email, password];
    try{
      const [data] = await db.query("SELECT email FROM user WHERE email = ?", [email]);

      if (data.length > 0) {
        return res.status(400).json({ status: "Email already exists" });
      } else {
        await db.query("INSERT INTO user (email, password) VALUES (?)", [values]);
        return res.status(200).send("User has been registered");
      }
    } catch (err) {
      console.error(`An error has occured while registering: ${err.message}`);
      res.status(500).json({ status: "Internal Server Error", error: err.message });
    }
  }
);

router.post("/login",
  body('email').isEmail().notEmpty(),
  body('password').isLength({ min: 6 }).notEmpty(),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ status: "Log in validation errors", errors: result.array() });
    }

    const {email, password} = req.body;

    try{
      const [data] = await db.query("SELECT email, password FROM user WHERE email = ?", [email]);

      if (data.length === 0) {
        return res.status(400).json({ status: "No user with that email." });
      } else {
        const user = data[0];
        if (user.password === password) {
          return res.status(200).send("User logged in successfully");
        }
        else {
          return res.status(400).json({ status: "Incorrect password." });
        }
      }
    } catch (err) {
      console.error(`An error has occured while logging in: ${err.message}`);
      return res.status(500).json({ status: "Internal Server Error", error: err.message });
    }
  }
);

export default router;