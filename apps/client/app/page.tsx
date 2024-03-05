import Hero from "./components/Hero";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
export default async function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Main />
      <Footer />
    </>
  );
}
