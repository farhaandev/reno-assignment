type SchoolProps = {
  school: {
    id: number;
    name: string;
    city: string;
    address: string;
    image: string;
  };
};

export default function SchoolCard({ school }: SchoolProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-300 hover:shadow-md transition overflow-hidden">
      <img
        src={school.image}
        alt={school.name}
        className="h-48 w-full object-cover"
      />
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="font-semibold text-lg">{school.name}</h3>
          <div>
            <p className="text-gray-500 text-sm">{school.address}, {school.city}</p>
          </div>
        </div>
        {/* <button className="bg-cyan-700 text-white py-1.5 px-3 rounded hover:bg-cyan-600">View Details</button> */}
      </div>
    </div>
  );
}
