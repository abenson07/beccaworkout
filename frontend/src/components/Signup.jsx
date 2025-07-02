import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Signup() {
  const [form, setForm] = useState({ name: "", dob: "", email: "" });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!form.dob) {
      newErrors.dob = "Date of birth is required.";
    } else if (isNaN(Date.parse(form.dob))) {
      newErrors.dob = "Date of birth is invalid.";
    }
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Email format is invalid.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage("");
      return;
    }
    setMessage("Submitting...");
    const { data, error } = await supabase
      .from("trainees")
      .insert([{ name: form.name, dob: form.dob, email: form.email }]);
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Signup successful!");
      setForm({ name: "", dob: "", email: "" });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <span style={{ color: "red" }}> {errors.name}</span>}
      </label>
      <br />
      <label>
        Date of Birth:
        <input name="dob" type="date" value={form.dob} onChange={handleChange} />
        {errors.dob && <span style={{ color: "red" }}> {errors.dob}</span>}
      </label>
      <br />
      <label>
        Email:
        <input name="email" type="email" value={form.email} onChange={handleChange} />
        {errors.email && <span style={{ color: "red" }}> {errors.email}</span>}
      </label>
      <br />
      <button type="submit">Sign Up</button>
      <div>{message}</div>
    </form>
  );
} 