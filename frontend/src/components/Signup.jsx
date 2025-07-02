import React, { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({ name: "", dob: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send form data to backend API
    alert("Signup submitted! (Backend integration needed)");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Date of Birth:
        <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Email:
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
} 