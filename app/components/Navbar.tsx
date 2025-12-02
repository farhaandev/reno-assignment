"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {

    const pathname = usePathname();

    return (
        <header className="bg-white border-b border-gray-200 md:px-6 px-4 py-3 fixed top-0 z-50 w-full">
            <nav className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center container mx-auto text-center">
                    <h1 className="text-cyan-700">
                        <Link href="/" className="uppercase leading-0.5 text-center">
                            <span className="text-2xl font-bold">Reno</span>
                            <span className="block text-sm font-light -mt-2">Schools</span>
                        </Link>
                    </h1>

                    <div className={`items-center gap-8 text-sm ${pathname === "/" ? "md:flex hidden" : ""}`}>
                        {pathname !== "/view-schools" && (
                            <Link href="/view-schools" className="hover:text-cyan-700">
                                View Schools
                            </Link>
                        )}

                        {pathname !== "/add-school" && (
                            <Link href="/add-school" className="bg-cyan-700 text-white hover:bg-cyan-600 py-2 px-4 border border-cyan-700 rounded-full transition-all duration-200">
                                + Add School
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
