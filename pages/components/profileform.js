import { useState } from "react";

export default function ProfileForm({ initialValues, onSubmit }) {
  const [form, setForm] = useState(initialValues);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <button type="submit">Save</button>
    </form>
  );
}