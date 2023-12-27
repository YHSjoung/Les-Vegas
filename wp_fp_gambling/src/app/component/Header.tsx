import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import Head from "next/head";

const Header = ({userId}: {userId: string}) => {

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
<<<<<<< HEAD
        <Link href="/" className="text-black text-xl font-bold">
          As Vegas
=======
      <div className="container">
        <Link href="/">
            Las Vagas
>>>>>>> 321e91ac47e6feb902f14285c0e6a8e45e53db1e
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <Link href="/" className="text-red-500">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/product">
                  Products
              </Link>
            </li>
            <li className="nav-item">
            </li>
          </ul>
        </div>
        <div className="buttons text-center">
            <Link href="/cart" className="border p-2 rounded-lg text-xl">
                <i className="fa fa-cart-shopping m-1"></i> Cart
            </Link>
        </div>
      </div>
        {!userId && (
          <Link href="/signIn" className="text-white text-xl font-bold">
            SignIn
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />

      </nav>
    </>
  );
};

export default Header;
