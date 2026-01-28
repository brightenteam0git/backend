import express from "express";
import multer from "multer";
import PetWellbeing from "../models/PetWellbeing.js";
import fs from "fs";

const router = express.Router();

/* MULTER */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage }).any();


router.get("/", async (req, res) => {
  let data = await PetWellbeing.findOne();

  if (!data) {
    data = {
      heading: "",
      subheading: "",
      sections: [],
      buttonText: "",
      buttonLink: "",
      image: ""
    };
  }

  res.json(data);
});


router.post("/", upload, async (req, res) => {
  try {
    let data = await PetWellbeing.findOne();

    let innerPage = req.body.innerPage
      ? JSON.parse(req.body.innerPage)
      : data?.innerPage;

      if (!innerPage.cards) {
  innerPage.cards = [];
}

    req.files?.forEach((file) => {
      if (file.fieldname === "image") {
        innerPage.icon = `/uploads/${file.filename}`;
      }

      if (file.fieldname.startsWith("cardImage_")) {
        const index = file.fieldname.split("_")[1];
         if (!innerPage.cards[index]) innerPage.cards[index] = {};
    innerPage.cards[index].image = `/uploads/${file.filename}`;
  }
});

    const payload = {
      ...req.body,
      sections: req.body.sections
        ? JSON.parse(req.body.sections)
        : data?.sections,
      innerPage,
    };

    if (!data) data = new PetWellbeing(payload);
    else Object.assign(data, payload);

    await data.save();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Wellbeing save failed" });
  }
});


export default router;
