import mongoose from "mongoose";

const BestPetSchema = new mongoose.Schema({
  mainHeading: { 
    type: String, 
    default: "Simply The Best For Your Pet" 
  },
  features: [
    {
      img: { type: String, default: "" },
      title: { type: String, default: "" },
      desc: { type: String, default: "" },
    }
  ]
}, { timestamps: true });

const BestPet = mongoose.model("BestPet", BestPetSchema);
export default BestPet;