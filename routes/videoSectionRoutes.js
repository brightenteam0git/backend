import express from "express";
import multer from "multer";
import VideoSection from "../models/VideoSection.js";

const router = express.Router();

/* FILE UPLOAD SETUP */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

/* TEST ROUTE (FOR DEBUG) */
router.get("/test", (req, res) => {
  res.send("Video section route working");
});

/* GET VIDEO SECTION */
router.get("/", async (req, res) => {
  let data = await VideoSection.findOne();
  if (!data) {
    data = await VideoSection.create({
      circleText: "LifeWise Pet Nutrition • What We Do • And We Love It •",
      heading: "Let’s find the perfect food for your pet",
      rotationSpeed: 20,
    });
  }
  res.json(data);
});

/* UPDATE VIDEO SECTION */
router.put(
  "/",
  upload.fields([
    { name: "leftVideo" },
    { name: "rightVideo" },
  ]),
  async (req, res) => {
    const updateData = {
      circleText: req.body.circleText,
      heading: req.body.heading,
      rotationSpeed: req.body.rotationSpeed,
    };

    if (req.files?.leftVideo) {
      updateData.leftVideo = `/uploads/${req.files.leftVideo[0].filename}`;
    }
    if (req.files?.rightVideo) {
      updateData.rightVideo = `/uploads/${req.files.rightVideo[0].filename}`;
    }

    const updated = await VideoSection.findOneAndUpdate(
      {},
      updateData,
      { new: true, upsert: true }
    );

    res.json(updated);
  }
);

export default router;
