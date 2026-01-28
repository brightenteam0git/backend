import mongoose from "mongoose";

const contactFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: String,
    message: String,
  },
  { timestamps: true }
);

const ContactForm = mongoose.model("ContactForm", contactFormSchema);

export default ContactForm;
