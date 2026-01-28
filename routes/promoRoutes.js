import express from "express";
import multer from "multer";
import Promo from "../models/Promo.js";
import fs from "fs";

const router = express.Router();

/* -------- MULTER -------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  let promo = await Promo.findOne();

  // ✅ AUTO CREATE FIRST PROMO
  if (!promo) {
    promo = await Promo.create({
      title: "New Promo Title",
      description: "Add promo description here",
      buttonText: "Shop Now",
      image: "",
    });
  }

  res.json(promo);
});

/* -------- ADD / UPDATE PROMO -------- */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let promo = await Promo.findOne();

    // if image uploaded
    let imagePath = promo?.image;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;

      // delete old image
      if (promo?.image && fs.existsSync("." + promo.image)) {
        fs.unlinkSync("." + promo.image);
      }
    }

    if (!promo) {
      promo = new Promo({
        title: req.body.title,
        description: req.body.description,
        buttonText: req.body.buttonText,
        image: imagePath,
      });
    } else {
      promo.title = req.body.title;
      promo.description = req.body.description;
      promo.buttonText = req.body.buttonText;
      promo.image = imagePath;
    }

    await promo.save();
    res.json(promo);
  } catch (err) {
    console.error("PROMO ERROR:", err);
    res.status(500).json({ message: "Promo save failed" });
  }
});

export default router;
