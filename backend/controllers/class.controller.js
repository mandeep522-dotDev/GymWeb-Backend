import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { Class } from "../models/classes.model.js";
import { apiResponce } from "../utils/apiResponce.js";

const createClass = asyncHandler(async (req, res) => {
        const { title, trainer, schedule, description } = req.body;
        if (!title || !trainer || !schedule) {
            throw new apiError(400, "Title, trainer, and schedule are required");
        }
        const newClass = new Class({
            title,
            trainer,
            schedule,
            description
        })
        await newClass.save();
        return res
        .status(201)
        .json(new apiResponce(
            200, newClass, "Class created successfully"
        ))
})

const getAllClasses = asyncHandler(async (req, res) => {
        const classes = await Class.find();
        return res
        .status(200)
        .json(new apiResponce(
            200, classes, "classes fetched successfully"
        ))
})

const deleteClass = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const deletedClass = await Class.findByIdAndDelete(id);
        if (!deletedClass) {
            throw new apiError(404, "Class not found");
        }
        return res
        .status(200)
        .json(new apiResponce(
            200, deletedClass, "Class deleted successfully"
        ))
})

export { createClass, getAllClasses, deleteClass };
