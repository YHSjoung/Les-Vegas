"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import Head from "next/head";

const Header = ({
  userId,
  dollar,
}: {
  userId: string;
  dollar: number | null;
}) => {
  const [dollarNum, setDollarNum] = useState<number | null>(dollar);
  useEffect(() => {
    setDollarNum(dollar);
  }, [dollar]);

  return (
    <div className="header fixed z-10 w-full bg-gray-900 bg-opacity-95">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
        />
      </Head>
      <nav className="py-4 px-4 flex items-center justify-between">
        <div className="flex items-center justify-between gap-4 w-full mr-4">
          <Link href="/" className="text-4xl">
            Las Vagas
          </Link>
          <div className="links flex gap-4">
            <Link href="/" className="text-gray-500 text-xl">
              Home
            </Link>
            <Link href="/product" className="text-gray-500 text-xl">
              Products
            </Link>
          </div>
          {userId && (
            <div>
              <p className="text-white text-xl font-bold">$ {dollar}</p>
            </div>
          )}
          <div className="buttons text-center">
            <Link href="/cart" className="border p-2 rounded-lg text-xl">
              <i className="fa fa-cart-shopping m-1" />
              Cart
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
    </div>
  );
};

export default Header;
