import express from "express";
import multer from "multer";
import ContactUs from "../models/ContactUs.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* =========================
   GET CONTACT US
========================= */
router.get("/", async (req, res) => {
  const data = await ContactUs.findOne();
  res.json(data);
});

/* =========================
   SAVE CONTACT US
========================= */
router.post("/", upload.any(), async (req, res) => {
  try {
    const body = JSON.parse(req.body.data);

    // HERO + FORM ICON
    req.files.forEach((file) => {
      if (file.fieldname === "heroBanner") {
        body.heroBanner = `/uploads/${file.filename}`;
      }

      if (file.fieldname === "formIcon") {
        body.contactForm.icon = `/uploads/${file.filename}`;
      }
    });

    // 🔥 CARD ICONS (FIXED)
   req.files.forEach((file) => {
  if (file.fieldname.startsWith("cardIcon")) {
    const index = Number(file.fieldname.replace("cardIcon", ""));
    if (body.cards[index]) {
      body.cards[index].icon = `/uploads/${file.filename}`;
    }
  }
});


    await ContactUs.findOneAndUpdate({}, body, {
      upsert: true,
      new: true,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("CONTACT SAVE ERROR:", err);
    res.status(500).json({ error: "Contact save failed" });
  }
});

export default router;
