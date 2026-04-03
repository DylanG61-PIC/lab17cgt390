// pages/api/profiles/[id].js
let profiles = [
  { id: 1, name: "Ava Lee", title: "Developer", email: "ava@example.com" },
  { id: 2, name: "Ben Smith", title: "Designer", email: "ben@example.com" },
];

export default function handler(req, res) {
  const { id } = req.query;
  const profileId = parseInt(id);
  const profile = profiles.find(p => p.id === profileId);

  if (!profile) return res.status(404).json({ error: "Profile not found" });

  if (req.method === "GET") res.status(200).json(profile);
  else if (req.method === "PUT") {
    const updatedProfile = { ...profile, ...req.body };
    profiles = profiles.map(p => (p.id === profileId ? updatedProfile : p));
    res.status(200).json(updatedProfile);
  } else if (req.method === "DELETE") {
    profiles = profiles.filter(p => p.id !== profileId);
    res.status(200).json({ message: "Profile deleted" });
  } else res.status(405).json({ error: "Method not allowed" });
}
