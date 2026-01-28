import express from "express";
import Product from "../models/Product.js";
import multer from "multer";

const router = express.Router();

/* ---------------- MULTER ---------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ---------------- ADD PRODUCT ---------------- */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, desc, subCategory, group } = req.body;

    const product = new Product({
      title,
      desc,
      subCategory,
      group,
      img: "/uploads/" + req.file.filename,
    });

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Add product failed" });
  }
});

/* ---------------- GET ALL PRODUCTS ---------------- */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ message: "Fetch failed" });
  }
});

/* ---------------- GET PRODUCTS BY SUB ---------------- */
router.get("/sub/:sub", async (req, res) => {
  try {
    const products = await Product.find({
      subCategory: req.params.sub,
    });
    res.json(products);
  } catch {
    res.status(500).json({ message: "Fetch failed" });
  }
});

/* ---------------- GET PRODUCT BY ID (IMPORTANT) ---------------- */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found" });
    }

    res.json(product);
  } catch {
    res.status(400).json({ message: "Invalid product ID" });
  }
});

/* ---------------- DELETE PRODUCT ---------------- */
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      desc: req.body.desc,
      subDesc: req.body.subDesc,
    };

    // 🔥 image sirf tab update karo jab new image aaye
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
