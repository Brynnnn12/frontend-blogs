import { Outlet } from "react-router-dom";
import Navbar from "../../components/Layouts/Home/Navbar";
import Footer from "../../components/Layouts/Home/Footer";

export default function HomeLayouts() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
