import SchoolForm from "../components/SchoolForm";

export default function AddSchool() {
  return (
    <div className="pt-24 pb-6 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Add School
        </h2>
        <SchoolForm />
      </div>
    </div>
  );
}
