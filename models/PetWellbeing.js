import mongoose from "mongoose";

const InnerCardSchema = new mongoose.Schema({
  image: String,
  category: String,
  title: String,
  description: String,
  subDescription: String,
});

const WellbeingSchema = new mongoose.Schema({
  /* MAIN PAGE */
  heading: String,
  subheading: String,
  sections: [
    {
      title: String,
      description: String,
    },
  ],
  buttonText: String,
  buttonLink: String,
  image: String,

  /* INNER PAGE */
  innerPage: {
    icon: String,
    heading: String,
    subheading: String,
    cards: [InnerCardSchema],
  },
});

export default mongoose.model("Wellbeing", WellbeingSchema);
