import { Link } from "react-router-dom";
import Navbar from "../../components/Layouts/Home/Navbar";
import Hero from "../../components/Layouts/Home/Hero";
import Footer from "../../components/Layouts/Home/Footer";
import BlogCarousel from "../../components/Layouts/Home/BlogCarousel.jsx";
import About from "../../components/Layouts/Home/About.jsx";

export default function HomeLayouts() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <BlogCarousel />
      <Footer />
    </>
  );
}
