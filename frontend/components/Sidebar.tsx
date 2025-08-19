"use client";

import Link from "next/link";
import { useState } from "react";

const routes = [
  { path: "/", label: "Home" },
  { path: "/learn", label: "Learn" },
  { path: "/train", label: "Train" },
  { path: "/me", label: "Profile" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`absolute top-0 left-0 bg-cfg text-white h-screen transition-all duration-300 z-20 ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      <div className="flex flex-col h-full sticky top-0">
        <button
          className="flex p-2 items-center mt-4 justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src="/logo.png" alt="englist.io" className="w-12 object-cover" />
          {isOpen && <span className="text-3xl font-head">Englist.io</span>}
        </button>
        <div className="w-full h-[2px] bg-gray-600 my-4" />
        <div className="mt-4 space-y-4">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="block py-3 px-8 hover:bg-white hover:text-gray-800"
            >
              {isOpen && route.label}
            </Link>
          ))}
          {/* Thêm các mục */}
        </div>
      </div>
    </aside>
  );
}
