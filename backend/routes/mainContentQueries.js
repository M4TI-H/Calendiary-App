import { Router } from "express";
import db from "../server.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const router = Router();
dotenv.config();


export default router;