// this is server side example
// import ClientSide from "./ClientSide";
// import { trpc } from "./trpc";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Main from "./components/Main";
import Footer from "./components/Footer";
export default async function Home() {
  // getting hello from the nest successfully

  // const response = await trpc.hello.query({ name: "Boris" });

  return (
    <>
      <Navbar />
      <Hero />
      <Main />
      <Footer />
    </>
  );
}
