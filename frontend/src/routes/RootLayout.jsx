import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-brand-gradient text-light">
      <Header />
      <main className="flex-grow">

        {/* Renders the nested route components */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
