// backend/routes/videoCall.routes.js

import express from "express";
import { callUser, answerCall } from "../controllers/videoCall.controller.js";

const router = express.Router();

router.post("/call", callUser);
router.post("/answer", answerCall);

export default router;
