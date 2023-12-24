import Link from "next/link";
import { auth, UserButton } from "@clerk/nextjs";
import Head from "next/head";

const Header = () => {
  const { userId } = auth();

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
        />
      </Head>

      <nav className="py-4 px-4 flex items-center justify-between">
        <Link href="/" className="text-black text-xl font-bold">Gambling</Link>
        {!userId && <Link href="/signIn" className="text-black text-xl font-bold">SignIn</Link>}
        <UserButton afterSignOutUrl="/" />
      </nav>
    </>
  );
};

export default Header;