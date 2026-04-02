import prisma from "@/lib/prisma";

export default async function Home() {
  const profiles = await prisma.profile.findMany();

  return (
    <div>
      <h1>Profiles</h1>
      {profiles.length === 0 && <p>No profiles found.</p>}
      {profiles.map((p) => (
        <div key={p.id}>
          <p>{p.name}</p>
          <p>{p.title}</p>
          <p>{p.email}</p>
          <p>{p.bio}</p>
          <img src={p.image_url} alt={p.name} width={100} />
        </div>
      ))}
    </div>
  );
}