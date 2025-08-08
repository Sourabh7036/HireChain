const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Candidate = require("../models/Candidate");

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "_" + Date.now() + ext;
    cb(null, name);
  }
});
const upload = multer({ storage });

// Candidate Submission Route
router.post(
  "/",
  upload.fields([
    { name: "aadharCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "resume", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        name,
        gender,
        contact,
        role,
        location,
        reference,
        experience,
        candidateEmail,
        contactedHR
      } = req.body;

      const existing = await Candidate.findOne({ contact });
      if (existing) {
        return res.status(409).json({ message: "❗Candidate already exists with this contact" });
      }

      const candidate = new Candidate({
        name,
        gender,
        contact,
        role,
        location,
        reference,
        experience,
        candidateEmail,
        contactedHR,
        aadharCard: req.files.aadharCard?.[0]?.path,
        panCard: req.files.panCard?.[0]?.path,
        resume: req.files.resume?.[0]?.path
      });

      await candidate.save();
      res.status(201).json({ message: "✅ Candidate inserted successfully", candidate });
    } catch (err) {
      console.error("❌ Error saving candidate:", err);
      res.status(500).json({ message: "Error inserting candidate" });
    }
  }
);

module.exports = router;
