import express from "express";
import ContactForm from "../models/ContactForm.js";

const router = express.Router();

/* ======================
   SAVE CONTACT FORM
====================== */
router.post("/", async (req, res) => {
  try {
    const form = await ContactForm.create(req.body);
    res.json({ success: true, form });
  } catch (err) {
    res.status(500).json({ error: "Form submit failed" });
  }
});

/* ======================
   GET ALL SUBMISSIONS
====================== */
router.get("/", async (req, res) => {
  const forms = await ContactForm.find().sort({ createdAt: -1 });
  res.json(forms);
});

/* ======================
   COUNT SUBMISSIONS
====================== */
router.get("/count", async (req, res) => {
  const count = await ContactForm.countDocuments();
  res.json({ count });
});

export default router;
