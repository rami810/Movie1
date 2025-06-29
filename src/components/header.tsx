"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Header() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div>
      <header className=" text-white flex justify-between items-center lg:me-52 md:me-16 me-3 lg:ms-14 ms-2 p-4">
        <div className="flex justify-center items-center lg:gap-32 gap-10">
          <span>
            <Image
              alt="logo"
              width={100}
              height={100}
              src="/images/th (3).jpg"
            />
          </span>

          <Link href="/about">
            <motion.h1
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsActive(true)}
              className={`cursor-pointer transition-all pb-2 ${
                isActive ? "border-b-4 border-white" : ""
              }`}
            >
              Home
            </motion.h1>
          </Link>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, opacity: 0.8 }}
          whileTap={{ scale: 0.9 }}
          className="px-6 py-3 bg-white text-black rounded-2xl shadow-lg transition-all"
        >
          Help !
        </motion.button>
      </header>
    </div>
  );
}

export default Header;
