import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ["upi", "card", "netbanking"],
      required: true,
    },
    status: {
      type: String,
      default: "SUCCESS",
    },
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ]
    
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
