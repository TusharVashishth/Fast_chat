import MessageController from "../controller/MessageController.js";
import GroupController from "../controller/GroupController.js";
import { Router } from "express";
const router = Router();

router.get("/group", GroupController.index);
router.get("/group/:id", GroupController.show);
router.post("/group", GroupController.store);

// * Message routes
router.get("/messages/:group_id", MessageController.index);
router.post("/message", MessageController.store);

export default router;
