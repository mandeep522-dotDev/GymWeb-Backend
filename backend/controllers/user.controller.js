import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { apiResponce } from "../utils/apiResponce.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error(`User not found for userId: ${userId}`); // debug log
      throw new apiError(404, "User not found while generating tokens");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    // console.log(accessToken,refreshToken);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error in generateAccessTokenAndRefreshToken:", error); // debug log
    throw new apiError(
      500,
      "somthing went wrong while generating access token and refresh token",
      error,
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get details from frontend
  const { name, email, password, age } = req.body;
  console.log(req.body);

  // validation of data
  if (!name || !email || !password || !age) {
    throw new apiError(400, "all fields are required");
  }

  //email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new apiError(400, "invalid email format");
  }

  // chack if user already exists: email and username
  const existedUser = await User.findOne({ email: email.toLowerCase() });
  if (existedUser) {
    throw new apiError(409, "user already exists with email");
  }
  // create user in db
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    age,
    // gender is not included
  });

  // remove password and refresh token fields from responce
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  //chack user created or not
  if (!createdUser) {
    throw new apiError(500, "error while registring user");
  }
  //   console.log(createdUser);

  // return responce
  return res
    .status(201)
    .json(new apiResponce(201, createdUser, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // get data from frontend
  const { email, password } = req.body;
  // console.log("data is the : ", req.body);
  // validation of data
  if (!email) {
    throw new apiError(400, "email is required");
  }

  // find user from database
  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw new apiError(404, "user is not exists");
  }

  // chack password
  const passwordValidate = await user.isPasswordCorrect(password);
  if (!passwordValidate) {
    throw new apiError(401, "invalid password");
  }

  // generate access token and refresh token
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password",
  );

  const options = {
    httpOnly: true,
    secure: false, // set to false for localhost
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // allow cross-origin cookies for dev
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new apiResponce(
        200,
        { user: loggedInUser, accessToken },
        "user logged in successfully",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // clear cookies
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { refreshToken: null },
      },
      {
        new: true,
      },
    );
    const options = {
      httpOnly: true,
      secure: false, // set to false for localhost
      sameSite: "lax",
      path: "/",
    };

    return res
      .status(200)
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .json(new apiResponce(200, {}, "user logged out"));
  } catch (error) {
    throw new apiError(500, "somthing went wrong while logout user");
  }
});

const refresAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new apiError(401, "unauthorized access, token is missing");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new apiError(401, "invalid refresh token");
    }

    if (user?.refreshToken !== incomingRefreshToken) {
      throw new apiError(401, "expired refresh token or used");
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    const options = {
      httpOnly: true,
      secure: false, // set to false for localhost
      sameSite: "lax",
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new apiResponce(
          200,
          accessToken,
          "access token and refresh token renew successfully",
        ),
      );
  } catch (error) {
    throw new apiError(
      401,
      error?.message || "unauthorized access,invalid token",
    );
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new apiError(400, "all fields are required");
  }
  const user = await User.findById(req?.user._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new apiError(401, "Invalid old password");
  }

  user.password = newPassword;
  user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new apiResponce(200, {}, "password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new apiResponce(200, req.user, "current user fetched successfully"));
});

const updeateUserDetails = asyncHandler(async (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email) {
    throw new apiError(400, "all fields are required");
  }

  const updeatedUser = await User.findByIdAndUpdate(
    req?.user._id,
    {
      $set: {
        name,
        email,
        age,
      },
    },
    {
      new: true,
    },
  )
    .select("-password -refreshToken")
    .lean();

  if (!updeatedUser) {
    throw new apiError(500, "error while updating user details");
  }
  return res
    .status(200)
    .json(
      new apiResponce(200, updeatedUser, "user details updated successfully"),
    );
});

const getAllUsers = asyncHandler(async (req, res) => {
  // console.log(req.user);
  
  const users = await User.find().select("-password -refreshToken").lean();
  // console.log('all users: ', users);
  
  return res
    .status(200)
    .json(new apiResponce(200, users, "all users fetched successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("deleted user: ", id);
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "invalid user id");
  }
  await User.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new apiResponce(200, {}, "user deleted successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refresAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updeateUserDetails,
  getAllUsers,
  deleteUser
};
