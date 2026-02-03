import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {AdminOnly } from "../middleware/new.middleware.js";
import { createClass, getAllClasses, deleteClass } from "../controllers/class.controller.js";

const router = express.Router();

//Admin create a new class
router.post("/create-class", verifyJWT, AdminOnly, createClass);

//Get all classes
router.get("/get-classes", getAllClasses);

//admin delete a class
router.delete("/:id", verifyJWT, AdminOnly, deleteClass);

export default router;
