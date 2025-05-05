import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from 'cors';
import authRouter from "./routes/authQueries.js";
import userRouter from "./routes/userDataQueries.js";
import mainRouter from "./routes/mainContentQueries.js";

const app = express();
app.use(cors());
app.use(express.json()); 
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/main', mainRouter);

dotenv.config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => 
    console.log(`Server is running on port ${PORT}`)
);

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "calendiary"
});

export default db;