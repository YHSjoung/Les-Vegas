import Header from "./component/Header";
import TestAPI from "@/component/TestAPI";
import { auth, UserButton } from "@clerk/nextjs";
import { Navbar, Main, Footer, Wrapper, WrapperNav } from "./component";

export default function Home() {
  const { userId } = auth();
  console.log(userId);
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
