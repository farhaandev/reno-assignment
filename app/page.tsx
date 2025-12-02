import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col md:items-center justify-center min-h-screen md:text-center px-6 md:space-y-8 space-y-5 bg-linear-to-t from-cyan-100 to-white text-left">
      <h1 className="text-5xl sm:text-6xl font-bold text-cyan-700">
        Reno School Platform
      </h1>

      <p className="max-w-md text-gray-600">
        Store and manage school data using a simple form and view them like an
        ecommerce listing.
      </p>

      <div className="flex sm:flex-row md:gap-6 gap-4">
        <Link
          href="/add-school"
          className="px-7 py-2 bg-cyan-700 text-white rounded-full hover:bg-cyan-600"
        >
          + Add School
        </Link>

        <Link
          href="/view-schools"
          className="px-7 py-2 border-2 border-cyan-700 text-cyan-700 rounded-full hover:bg-cyan-700 hover:text-white transition"
        >
           View Schools
        </Link>
      </div>

      <footer className="mt-10 text-gray-500 text-sm w-full text-center ">
        <div className="absolute bottom-3 left-1/2 right-1/2 transform -translate-1/2 w-full space-y-1">
          <p>Assignment Project - Made by Farhaan</p>
          <Link href="https://github.com/farhaandev" target="_blank" className="text-cyan-600">
           Github
          </Link>
        </div>
      </footer>
    </div>
  );
}
