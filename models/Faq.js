import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const categorySchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema],
});

const faqSchema = new mongoose.Schema(
  {
    heroImage: String,
    heroLabel: String,
    categories: [categorySchema],

    sidebarImage: String,
  },
  { timestamps: true }
);



export default mongoose.model("Faq", faqSchema);
