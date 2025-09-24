// models/Fee.js
const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Paid", "Partial", "Pending"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "MobileMoney", "BankTransfer"],
      default: "Cash",
    },
    billingCycle: {
      type: String,
      enum: ["Monthly", "Quarterly"],
      required: true,
    },
    period: {
      type: String, // ex: "January 2025" ou "Q1 2025"
      required: true,
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fee", feeSchema);
