import Header from "./component/Header";
import TestAPI from "@/component/TestAPI";
import { auth, UserButton } from "@clerk/nextjs";
import { Navbar, Main, Footer, Wrapper, WrapperNav } from "./component";

export default function Home() {
  const { userId } = auth();
  console.log(userId);
  return (
    <>
      <Header userId={userId!}/>
      <Main />
      <Wrapper />
      <Footer />

      <TestAPI
        userId={userId!}
        contractId="m.2023-12-27.2330"
        option="optionA"
        dollar={100}
      />
    </>
  );
}
