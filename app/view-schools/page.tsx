import SchoolCard from "../components/SchoolCard";
import { prisma } from "../lib/prisma";

export default async function ShowSchools() {

  const schools = await prisma.school.findMany({
    orderBy: { id: "desc" },
    select: {
      id: true,
      name: true,
      address: true,
      city: true,
      image: true,
    }
  });

  if (schools.length == 0) {
    return (
      <p className="mt-4 text-gray-600 pt-32 text-center px-6">
        No schools found yet. Add one using &quot;Add School&quot;.
      </p>
    );
  }

  return (
    <div className="pt-24 max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Schools List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school) => (
          <SchoolCard
            key={school.id}
            school={{
              id: school.id,
              name: school.name,
              address: school.address,
              city: school.city,
              image: school.image || "/placeholder.jpg",
            }}
          />
        ))}
      </div>
    </div>
  );
}
