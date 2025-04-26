import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
  res.status(200).send("User has been registered");
});

export default router;