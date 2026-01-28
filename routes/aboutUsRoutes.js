import express from "express";
import multer from "multer";
import AboutUs from "../models/AboutUs.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* GET */
router.get("/", async (req, res) => {
  const data = await AboutUs.findOne();
  res.json(data);
});

/* SAVE / UPDATE */
router.post("/", upload.any(), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);

    if (req.files) {
      req.files.forEach((file) => {
        if (file.fieldname === "heroBanner") {
          data.heroBanner = `/uploads/${file.filename}`;
        }

        if (file.fieldname.startsWith("section-")) {
          const index = file.fieldname.split("-")[1];
          data.sections[index].image = `/uploads/${file.filename}`;
        }

        if (file.fieldname.startsWith("value-")) {
          const index = file.fieldname.split("-")[1];
          data.values[index].icon = `/uploads/${file.filename}`;
        }

        if (file.fieldname === "bottomImage") {
          data.bottomSection.image = `/uploads/${file.filename}`;
        }
      });
    }

    await AboutUs.findOneAndUpdate({}, data, { upsert: true });
    res.json({ success: true });
  } catch (err) {
    console.error("ABOUT US SAVE ERROR:", err);
    res.status(500).json({ error: "Save failed" });
  }
});


export default router;
