import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponce } from "../utils/apiResponce.js";
import { Subscriber } from "../models/subscriber.model.js"

const saveSubscribers = asyncHandler(async (req, res) =>{
   const { email } = req.body;
   console.log(email);
   

   if(!email){
    throw new apiError(400, "Email is required")
   }

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new apiError(400, "invalid email format");
    }
    const existedUser = await Subscriber.findOne({ email: email});
    if (existedUser) {
        throw new apiError(409, "user already exists with email");
    }

    const subscriber = await Subscriber.create({email: email.toLowerCase()})

    if(!subscriber){
        throw new apiError(500, "somthing went wrong while saving in db")
    }

    return res
    .status(200)
    .json(new apiResponce(
        200,
        subscriber,
        "subscribed gym for news successfully"
    ))
})

const getAllSubscribers = asyncHandler(async (req, res) => {
    const subscribers = await Subscriber.find().lean();

    return res
    .status(201)
    .json(new apiResponce(
        201,
        subscribers,
        "fetched all subscriber successfully"
    ))
})

export {saveSubscribers, getAllSubscribers}