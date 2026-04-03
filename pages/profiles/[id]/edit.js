import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProfileForm from "../../../components/ProfileForm";

export default function EditProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/profiles/${id}`)
        .then(res => res.json())
        .then(data => setProfile(data));
    }
  }, [id]);

  const handleSubmit = async updatedProfile => {
    await fetch(`/api/profiles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProfile),
    });
    router.push(`/profiles/${id}`);
  };

  return profile ? <ProfileForm initialValues={profile} onSubmit={handleSubmit} /> : <p>Loading...</p>;
}