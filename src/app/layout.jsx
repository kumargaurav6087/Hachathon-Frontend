import "./globals.css";

export const metadata = {
  title: "HackOn",
  description: "Hackathon Platform",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;