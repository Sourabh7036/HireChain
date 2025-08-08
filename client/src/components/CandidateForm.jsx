import React, { useState } from "react";
import axios from "axios";

const initialState = {
  name: "",
  gender: "",
  contact: "",
  location: "",
  role: "",
  resume: null,
  aadharCard: null,
  panCard: null,
  reference: "",
  experience: "",
  candidateEmail: "",
  contactedHR: "",
};

const roles = [
  "Full Stack Developer",
  "HR",
  "Frontend Developer",
  "Backend Developer",
  "QA Engineer",
  "SEO Executive",
  "WordPress Developer",
  "Video Editor",
  "Graphic Designer",
  "PHP Developer",
  "Other",
];

const references = [
  "LinkedIn",
  "Indeed",
  "Naukri",
  "Employee",
  "Referee",
  "Other",
];

export default function CandidateForm() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.contact) newErrors.contact = "Contact is required";
    if (!form.location) newErrors.location = "Location is required";
    if (!form.role) newErrors.role = "Role is required";
    if (!form.resume) newErrors.resume = "Resume is required";
    if (!form.aadharCard) newErrors.aadharCard = "Aadhar Card is required";
    if (!form.panCard) newErrors.panCard = "PAN Card is required";
    if (!form.reference) newErrors.reference = "Reference is required";
    if (!form.experience) newErrors.experience = "Experience is required";
    if (!form.candidateEmail) newErrors.candidateEmail = "Candidate Email is required";
    if (!form.contactedHR) newErrors.contactedHR = "This field is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await axios.post("http://localhost:5000/api/candidate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Data saved:", res.data);
      setSubmitted(true);
    } catch (err) {
      console.error("❌ Submission error:", err.response?.data || err.message);
      alert("Failed to submit form. Please check console for details.");
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-green-100 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-700">Form Submitted!</h2>
        <p className="text-green-600 mt-2">Thank you for submitting your details.</p>
        <button
          className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          onClick={() => {
            setForm(initialState);
            setSubmitted(false);
          }}
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-2 text-center text-indigo-600">Candidate Form</h1>
      <p className="text-center mb-8 text-gray-600">Please fill out the form below to apply for a position.</p>

      <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Reusable field */}
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Candidate Email", name: "candidateEmail", type: "email" },
          { label: "Contact", name: "contact", type: "text" },
          { label: "Location", name: "location", type: "text" },
          { label: "Experience (in years)", name: "experience", type: "number", min: 0 },
          { label: "Which HR reached out to you for this interview?", name: "contactedHR", type: "text" },
        ].map(({ label, name, type, min }) => (
          <div key={name}>
            <label className="block font-medium text-gray-700">
              {label}<span className="text-red-500">*</span>
            </label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              min={min}
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}

        {/* Gender */}
        <div>
          <label className="block font-medium text-gray-700">Gender<span className="text-red-500">*</span></label>
          <div className="mt-2 flex gap-4">
            {["Male", "Female", "Other"].map((gender) => (
              <label key={gender} className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={form.gender === gender}
                  onChange={handleChange}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2">{gender}</span>
              </label>
            ))}
          </div>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block font-medium text-gray-700">Role<span className="text-red-500">*</span></label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        {/* Resume */}
        {[
          { name: "resume", label: "Resume (PDF/DOC)", accept: ".pdf,.doc,.docx" },
          { name: "aadharCard", label: "Aadhar Card (PDF/JPG/PNG)", accept: ".pdf,.jpg,.jpeg,.png" },
          { name: "panCard", label: "PAN Card (PDF/JPG/PNG)", accept: ".pdf,.jpg,.jpeg,.png" },
        ].map(({ name, label, accept }) => (
          <div key={name}>
            <label className="block font-medium text-gray-700">
              {label}<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name={name}
              accept={accept}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}

        {/* Reference */}
        <div>
          <label className="block font-medium text-gray-700">Reference<span className="text-red-500">*</span></label>
          <select
            name="reference"
            value={form.reference}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Reference</option>
            {references.map((ref) => (
              <option key={ref} value={ref}>{ref}</option>
            ))}
          </select>
          {errors.reference && <p className="text-red-500 text-sm mt-1">{errors.reference}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
