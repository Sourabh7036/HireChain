const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    aadharCard: {
      type: String,
      required: true,
    },
    panCard: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    candidateEmail: {
      type: String,
      required: true,
    },
    contactedHR: {
      type: String,
      required: true,
    },
    stage: {
      type: Number,
      default: 0, // 0: HR, 1: Manager, 2: CEO, 3: Finalized
    },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
