import SchoolCard from "../components/SchoolCard";

const dummyData = [
  {
    id: 1,
    name: "Delhi Public School",
    city: "Lucknow",
    address: "Ring Road",
    image: "https://www.dpsnacharam.in/assets/images_nr/student-facility-bg.jpg",
  },
  {
    id: 2,
    name: "St. Mary's Academy",
    city: "Kanpur",
    address: "Civil Lines",
    image: "https://www.dpsnacharam.in/assets/images_nr/student-facility-bg.jpg",
  },
  {
    id: 3,
    name: "Delhi Public School",
    city: "Lucknow",
    address: "Ring Road",
    image: "https://www.dpsnacharam.in/assets/images_nr/student-facility-bg.jpg",
  },
  {
    id: 4,
    name: "St. Mary's Academy",
    city: "Kanpur",
    address: "Civil Lines",
    image: "https://www.dpsnacharam.in/assets/images_nr/student-facility-bg.jpg",
  },
];

export default function ShowSchools() {
  return (
    <div className="pt-24 max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Schools List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyData.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>
    </div>
  );
}
