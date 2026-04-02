"use client";

import { useState } from "react";

export default function AddProfile() {
  const [form, setForm] = useState({ name: "", title: "", email: "", bio: "", img: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/add/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image_url: form.img || "/vercel.svg", // placeholder image
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create profile");

      setSuccess("Profile added!");
      setForm({ name: "", title: "", email: "", bio: "", img: "" });
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} required />
      <input name="img" placeholder="Image URL" value={form.img} onChange={handleChange} />
      <button type="submit">Add Profile</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}