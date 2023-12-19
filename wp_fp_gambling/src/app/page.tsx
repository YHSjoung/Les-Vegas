import Header from "./component/Header";
import GetFinanceIndex from "@/component/getFinanceIndex";

export default function Home() {


  return (
    <>
      <Header />
      <h1 className="flex flex-col justify-between">Home</h1>
      <GetFinanceIndex />
    </>
  );
}
