"use client";

import "./globals.css";

import Header from "@/components/ui/header";

import Link from "next/link";

import {
  ArrowsRightLeftIcon,
  HomeIcon,
  UserCircleIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";

import { useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setSidebarCollapsed] = useState(true);

  const switchSidebar = () => {
    setSidebarCollapsed(!collapsed);
  };

  return (
    <div className="flex flex-col flex-start min-h-screen">
      <Header switchSidebar={switchSidebar} />

      <section className="flex flex-row justify-center lg:justify-start grow">
        <nav
          className={`flex flex-col w-[200px] lg:w-auto shadow justify-between h-full lg:h-auto lg:shadow-none fixed lg:relative lg:left-0 lg:top-0 lg:opacity-100 z-[99] top-0 bg-[#FFD12E] transition-all ${
            collapsed ? "right-[-200px] opacity-0" : "right-0 opacity-100"
          }`}
        >
          <div className="flex flex-col p-[16px] h-full text-white nav-bar">
            <Link onClick={() => setSidebarCollapsed(true)} href="/">
              <HomeIcon className="mr-[10px]" width={25} height={25} />
              Home
            </Link>
            <Link onClick={() => setSidebarCollapsed(true)} href="/account">
              <UserCircleIcon className="mr-[10px]" width={25} height={25} />
              Account
            </Link>
            <Link onClick={() => setSidebarCollapsed(true)} href="/transfer">
              <ArrowsRightLeftIcon
                className="mr-[10px]"
                width={25}
                height={25}
              />
              Transfer
            </Link>
            <Link onClick={() => setSidebarCollapsed(true)} href="/network">
              <ShareIcon
                className="rotate-90 mr-[10px]"
                width={25}
                height={25}
              />
              Network
            </Link>
          </div>
          <div
            onClick={() => setSidebarCollapsed(true)}
            className="flex flex-row lg:hidden px-[16px] w-full text-[29px] bg-[#151515] text-white cursor-pointer"
          >
            &times; Close
          </div>
        </nav>

        <div className="flex flex-col w-full md:w-3/4 px-[16px] my-4 lg:ml-4">
          {children}
        </div>
      </section>
      <footer className="flex flex-row justify-center bg-white py-[5px] grow-0">
        <p className="text-lg text-[#222]">© 2023 hybridhive</p>
      </footer>
    </div>
  );
}
