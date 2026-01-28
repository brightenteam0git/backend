import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    questions: [questionSchema],
  },
  { _id: false }
);

const faq2Schema = new mongoose.Schema(
  {
    heroLabel: { type: String },
    heroImage: { type: String },
    sidebarImage: { type: String },
    categories: [categorySchema],
  },
  { timestamps: true }
);

export default mongoose.model("FAQ2", faq2Schema);
