import express from "express";
import multer from "multer";
import Hero from "../models/Hero.js";
import fs from "fs";

const router = express.Router();

// STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

/* ==============================
      GET ALL SLIDES
============================== */
router.get("/", async (req, res) => {
  const slides = await Hero.find();
  res.json(slides);
});

/* ==============================
      ADD NEW SLIDE
============================== */
router.post("/", upload.single("image"), async (req, res) => {
  const slide = new Hero({
    title: req.body.title,
    subtitle: req.body.subtitle,
    tagline: req.body.tagline,
    image: `/uploads/${req.file.filename}`,
  });

  await slide.save();
  res.json({ message: "Hero slide added", slide });
});

/* ==============================
      UPDATE SLIDE (TEXT ONLY)
============================== */
router.put("/:id", async (req, res) => {
  const updated = await Hero.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      subtitle: req.body.subtitle,
      tagline: req.body.tagline,
    },
    { new: true }
  );
  res.json(updated);
});

/* ==============================
      UPDATE IMAGE ONLY
============================== */
router.put("/image/:id", upload.single("image"), async (req, res) => {
  const slide = await Hero.findById(req.params.id);

  if (!slide) return res.status(404).json({ error: "Slide not found" });

  if (slide.image && fs.existsSync("." + slide.image)) {
    fs.unlinkSync("." + slide.image);
  }

  slide.image = `/uploads/${req.file.filename}`;
  await slide.save();

  res.json(slide);
});

/* ==============================
      DELETE SLIDE
============================== */
router.delete("/:id", async (req, res) => {
  const slide = await Hero.findById(req.params.id);
  if (!slide) return res.status(404).json({ error: "Slide not found" });

  if (slide.image && fs.existsSync("." + slide.image)) {
    fs.unlinkSync("." + slide.image);
  }

  await slide.deleteOne();

  res.json({ message: "Slide deleted" });
});

export default router;
