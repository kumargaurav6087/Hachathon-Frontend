import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

export const metadata = {
  title: "HackathonHub",
  description: "Hackathon Management System",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;