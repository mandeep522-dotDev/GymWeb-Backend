import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    trainer: {
        type: String,
        required: true,
    },
    schedule: {
        type: String,
        required: true,
    },
    description: {
        type: String
    }
},{timestamps: true});

export const Class = mongoose.model("Class", classSchema);
