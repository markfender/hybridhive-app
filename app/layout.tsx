"use client";

import "./globals.css";

import { Inter } from "next/font/google";

import { ConnectWallet, ThirdwebProvider } from "@thirdweb-dev/react";
// import { useConnectionStatus } from "@thirdweb-dev/react";

import Header from "@/components/ui/header";

import Link from "next/link";
import Image from "next/image";

import HHLogo from "@/public/hhlogo.svg";
//import HHLogo from '@/public/hybridhive-logo.png'

import {
  ArrowsRightLeftIcon,
  HomeIcon,
  UserCircleIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";

import { useState } from "react";
import { Goerli, Gnosis } from "@thirdweb-dev/chains";
import Wrapper from "./wrapper";
import { timeStamp } from "console";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "HybridHive App",
  description: "Manage accounts and send tokens through HybridHive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setSidebarCollapsed] = useState(true);

  const switchSidebar = () => {
    setSidebarCollapsed(!collapsed);
  };

  return (
    <html lang="en">
      <head>
        <title>hybridhive</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/alpinejs" async></script>

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/tippy.js/6.3.7/tippy.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          src="https://unpkg.com/@ryangjchandler/alpine-tooltip@1.2.0/dist/cdn.min.js"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          async
        ></script>
      </head>
      <body className={inter.className}>
        <ThirdwebProvider
          activeChain={Goerli}
          supportedChains={[Goerli, Gnosis]}
          autoConnect={false}
        >
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
                  <Link
                    onClick={() => setSidebarCollapsed(true)}
                    href="/account"
                  >
                    <UserCircleIcon
                      className="mr-[10px]"
                      width={25}
                      height={25}
                    />
                    Account
                  </Link>
                  <Link
                    onClick={() => setSidebarCollapsed(true)}
                    href="/transfer"
                  >
                    <ArrowsRightLeftIcon
                      className="mr-[10px]"
                      width={25}
                      height={25}
                    />
                    Transfer
                  </Link>
                  <Link
                    onClick={() => setSidebarCollapsed(true)}
                    href="/network"
                  >
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

              <div className="flex flex-col w-full md:w-3/4 px-[16px] my-4 lg:px-4">
                <Wrapper>{children}</Wrapper>
              </div>
            </section>
            <footer className="flex flex-row justify-center bg-white py-[5px] grow-0">
              <p className="text-lg text-[#222]">© 2023 hybridhive</p>
            </footer>
          </div>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
