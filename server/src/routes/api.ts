import express from "express";
import { getData, addUser, getAllUsers } from "../controllers/dataControllers";

const router = express.Router();

router.get("/getData", getData);
router.post("/addUser", addUser);
router.get("/users", getAllUsers);

export default router;
