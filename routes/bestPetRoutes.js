import express from "express";
import multer from "multer";
import path from "path"; // Fixed: was "mongoose" before
import BestPet from "../models/BestPet.js";

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    // path.extname now works correctly
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET Data
router.get("/", async (req, res) => {
  try {
    let data = await BestPet.findOne();
    if (!data) {
      data = await BestPet.create({ 
          mainHeading: "Simply The Best For Your Pet",
          features: [
              { title: "Curated by Vets", desc: "...", img: "" },
              { title: "Clean & Transparent", desc: "...", img: "" },
              { title: "Holistic Care", desc: "...", img: "" }
          ]
      });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE Data
router.post("/update", upload.any(), async (req, res) => {
  try {
    const { mainHeading, features } = req.body;
    const parsedFeatures = JSON.parse(features);
    
    // Handle new uploaded files
    if (req.files) {
      req.files.forEach(file => {
        // Extracts the index from "file[0]", "file[1]", etc.
        const match = file.fieldname.match(/file\[(\d+)\]/);
        if (match) {
          const index = match[1];
          parsedFeatures[index].img = `/uploads/${file.filename}`;
        }
      });
    }

    const updated = await BestPet.findOneAndUpdate({}, {
      mainHeading,
      features: parsedFeatures
    }, { new: true, upsert: true });
    
    res.json(updated);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Failed to update database" });
  }
});

export default router;