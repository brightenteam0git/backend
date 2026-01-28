import express from "express";
import FeaturedHeader from "../models/FeaturedHeader.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* GET */
router.get("/", async (req, res) => {
  const data = await FeaturedHeader.findOne();
  res.json(data);
});

/* SAVE / UPDATE */
router.post("/", upload.single("icon"), async (req, res) => {
  const { heading, description } = req.body;

  let data = await FeaturedHeader.findOne();
  if (!data) data = new FeaturedHeader();

  if (req.file) data.icon = `/uploads/${req.file.filename}`;
  data.heading = heading;
  data.description = description;

  await data.save();
  res.json({ success: true });
});

export default router;
