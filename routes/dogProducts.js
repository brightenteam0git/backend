import express from "express";
import multer from "multer";
import DogProduct from "../models/DogProduct.js";

const router = express.Router();

// 📁 image upload setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ➕ Add product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, subDescription, category } = req.body;
    const newProduct = new DogProduct({
      title,
      description,
      subDescription,
      category,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📦 Get all dog products
router.get("/", async (req, res) => {
  const products = await DogProduct.find();
  res.json(products);
});

export default router;
     