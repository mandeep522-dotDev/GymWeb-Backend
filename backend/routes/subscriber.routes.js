import { Router } from "express";
import { saveSubscribers, getAllSubscribers } from "../controllers/subscriber.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { AdminOnly } from "../middleware/new.middleware.js";

const router = Router();

router.route("/save-subscribers").post( saveSubscribers );
router.route("/getAllSubscribers").get(verifyJWT, AdminOnly, getAllSubscribers);

export default router;