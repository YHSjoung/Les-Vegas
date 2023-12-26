import Header from "./component/Header";
import TestAPI from "@/component/TestAPI";
import useUser from "@/component/UserData";
import { Navbar, Main, Footer, Wrapper, WrapperNav } from "./component";

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <Wrapper />
      <Footer />

      <TestAPI />
    </>
  );
}
