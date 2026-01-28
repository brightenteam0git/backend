import mongoose from "mongoose";

const wellnessJournalSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["header", "card"],
    default: "card",
  },
  position: String, // left | right (only for cards)
  heading: String,
  title: String,
  description: String,
  icon: String, // only for header
});

export default mongoose.model("WellnessJournal", wellnessJournalSchema);
