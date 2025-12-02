import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Reno - A School Platform",
  description: "Add and view schools",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <Navbar />
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  );
}
