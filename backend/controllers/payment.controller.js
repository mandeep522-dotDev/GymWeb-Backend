import { Payment } from "../models/payment.model.js";
import { User } from "../models/user.model.js"

export const createPayment = async (req, res) => {
  try {
    const { name, amount, method, user } = req.body;
    // console.log(req.body);

    if (!name || !amount || !method || !user) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const payment = await Payment.create({
      name,
      amount,
      method,
      user,
    });

    await User.findOneAndUpdate(user._id,
      { membership: "Active"}
    )
    console.log(User);
    

    return res.status(201).json({
      success: true,
      message: "Payment successful",
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Payment failed",
    });
  }
};
