import mongoose from "mongoose";

const contactCardSchema = new mongoose.Schema({
  icon: String,
  title: String,
  description: String,
  subDescription: String,
});

const contactFormSchema = new mongoose.Schema({
  icon: String,
  heading: String,
  description: String,
});

const contactUsSchema = new mongoose.Schema({
  heroBanner: String,

  cards: [contactCardSchema],

  contactForm: contactFormSchema,
});

export default mongoose.model("ContactUs", contactUsSchema);
