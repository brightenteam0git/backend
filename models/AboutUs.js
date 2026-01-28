import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  heroBanner: String,

  sections: [
    {
      image: String,
      title: String,
      description: String,
    },
  ],

  values: [
    {
      icon: String,
      heading: String,
      description: String,
    },
  ],

  bottomSection: {
    image: String,
    heading: String,
    description: String,
  },
});

export default mongoose.model("AboutUs", aboutSchema);
