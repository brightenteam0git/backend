import express from "express";
import multer from "multer";
import Faq from "../models/Faq.js";

const router = express.Router();

/* FILE UPLOAD */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

/* GET FAQ */
router.get("/", async (req, res) => {
  const faq = await Faq.findOne();
  res.json(faq);
});

/* SAVE / UPDATE FAQ */
router.post(
  "/",
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "sidebarImage", maxCount: 1 },
  ]),
  async (req, res) => {
    const data = JSON.parse(req.body.data);

    if (req.files?.heroImage) {
      data.heroImage = `/uploads/${req.files.heroImage[0].filename}`;
    }

    if (req.files?.sidebarImage) {
      data.sidebarImage = `/uploads/${req.files.sidebarImage[0].filename}`;
    }

    const existing = await Faq.findOne();

    if (existing) {
      await Faq.findByIdAndUpdate(existing._id, data);
    } else {
      await Faq.create(data);
    }

    res.json({ success: true });
  }
);


export default router;
