import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Signup() {
  const [form, setForm] = useState({ name: "", dob: "", email: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");
    const { data, error } = await supabase
      .from("trainees")
      .insert([{ name: form.name, dob: form.dob, email: form.email }]);
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Signup successful!");
      setForm({ name: "", dob: "", email: "" });
    }
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
      <div>{message}</div>
    </form>
  );
} 