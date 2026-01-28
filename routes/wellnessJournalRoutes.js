import express from "express";
import WellnessJournal from "../models/WellnessJournal.js";
import multer from "multer";

const router = express.Router();

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

/* ================= HEADER ROUTES ================= */

/* 🔝 GET HEADER */
router.get("/header", async (req, res) => {
  const header = await WellnessJournal.findOne({ type: "header" });
  res.json(header);
});

/* 🔝 CREATE / UPDATE HEADER */
router.post("/header", upload.single("icon"), async (req, res) => {
  const data = {
    type: "header",
    heading: req.body.heading,
  };

  if (req.file) {
    data.icon = `/uploads/${req.file.filename}`;
  }

  const header = await WellnessJournal.findOneAndUpdate(
    { type: "header" },
    data,
    { upsert: true, new: true }
  );

  res.json(header);
});

/* ================= CARD ROUTES ================= */

/* GET all journal cards */
router.get("/", async (req, res) => {
  const cards = await WellnessJournal.find({ type: "card" });
  res.json(cards);
});

/* CREATE / UPDATE card */
router.post("/", async (req, res) => {
  const { position, heading, title, description } = req.body;

  const updated = await WellnessJournal.findOneAndUpdate(
    { position, type: "card" },
    { type: "card", heading, title, description },
    { upsert: true, new: true }
  );

  res.json(updated);
});

export default router;
