import React from "react";
import Link from "next/link";
import { FaWallet } from "react-icons/fa";
import ProfileButton from "@/components/global/profileButton";

const Header = () => {
  return (
    <div className="relative">
      <header className="sticky top-5 bg-cyan-400 w-full rounded-full flex justify-between items-center py-2 px-4 md:px-6">
        <Link
          href="/"
          className="text-white text-2xl font-bold flex text-center items-center justify-start"
        >
          <FaWallet className="mr-2" />
          Expense Tracker
        </Link>
        <ProfileButton />
      </header>
    </div>
  );
};

export default Header;
