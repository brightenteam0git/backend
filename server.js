// server.js
import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

// ===== ROUTES =====
import categoryRoutes from "./routes/categoryRoutes.js";
import subCategoryRoutes from "./routes/subcategoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import promoRoutes from "./routes/promoRoutes.js";
import petWellbeingRoutes from "./routes/petWellbeingRoutes.js";
import videoSectionRoutes from "./routes/videoSectionRoutes.js";
import displayproductRoutes from "./routes/displayproductRoutes.js";
import rotatingBarRoutes from "./routes/rotatingBarRoutes.js";
import bestPetRoutes from "./routes/bestPetRoutes.js";
import wellnessJournalRoutes from "./routes/wellnessJournalRoutes.js";
import infoBannerRoutes from "./routes/infoBanner.js";
import featuredHeaderRoutes from "./routes/featuredHeaderRoutes.js";
import aboutUsRoutes from "./routes/aboutUsRoutes.js";
import contactUsRoutes from "./routes/contactUsRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import faq2Routes from "./routes/faq2Routes.js";
import contactFormRoutes from "./routes/contactFormRoutes.js";
import dashboardRoutes from "./routes/dashboard.js";

// ===== FILE PATH SETUP =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== APP SETUP =====
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ===== MONGODB CONNECTION =====
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MONGO_URI environment variable not set!");
  process.exit(1); // Stop app if MongoDB URI missing
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Stop app if cannot connect
  });

// ===== LOGGING =====
app.use((req, res, next) => {
  console.log(`REQ: ${req.method} ${req.url}`);
  next();
});

// ===== STATIC FILES =====
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== API ROUTES =====
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/promo", promoRoutes);
app.use("/api/petwellbeing", petWellbeingRoutes);
app.use("/api/video-section", videoSectionRoutes);
app.use("/api/display", displayproductRoutes);
app.use("/api/rotating-bar", rotatingBarRoutes);
app.use("/api/best-pet", bestPetRoutes);
app.use("/api/wellness-journal", wellnessJournalRoutes);
app.use("/api/info-banner", infoBannerRoutes);
app.use("/api/featured-header", featuredHeaderRoutes);
app.use("/api/about-us", aboutUsRoutes);
app.use("/api/contact-us", contactUsRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/faq2", faq2Routes);
app.use("/api/contact-form", contactFormRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ===== HEALTH CHECK =====
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// ===== SERVER START =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
