import express from "express";
import { getUser,getUserList } from "../controllers/user.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.get("/userList", getUserList);

export default router;
