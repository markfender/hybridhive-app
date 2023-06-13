"use client";

import "./globals.css";

import { Inter } from "next/font/google";

import { ConnectWallet, ThirdwebProvider } from "@thirdweb-dev/react";
// import { useConnectionStatus } from "@thirdweb-dev/react";

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
  let connectionStatus;

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
            {/* <header className="flex flex-row p-[16px] bg-[#151515] grow-0"> */}
            <header className="flex flex-row p-[16px] bg-white grow-0">
              <div className="flex flex-row justify-between align-center w-[100%]">
                <div className="flex flex-row items-center">
                  <button
                    onClick={switchSidebar}
                    className="flex justify-center items-center w-[52px] h-[52px] bg-yellow-300 rounded-full md:rounded-none fixed bottom-[30px] right-[40px] md:relative md:bottom-0 md:right-0 md:bg-transparent md:text-slate-900 z-[98] text-[20px] md:text-[22px] font-bold"
                  >
                    &#9776;
                  </button>
                  <Image src={HHLogo} alt="" className="mr-4 w-[32px]" />
                  <h1 className="text-[0px] text-white">hybridhive</h1>
                </div>
                <ConnectWallet
                  className="connect-wallet-button"
                  theme="light"
                />
              </div>
            </header>
            <nav
              className={`flex flex-col w-[200px] shadow-2xl  justify-between h-full fixed z-[99] top-0 bg-[#FFD12E] transition-all ${
                collapsed ? "right-[-200px] opacity-0" : "right-0 opacity-100"
              }`}
            >
              <div className="flex flex-col p-[16px] h-full text-white nav-bar">
                <Link onClick={() => setSidebarCollapsed(true)} href="/">
                  <HomeIcon className="mr-[10px]" width={25} height={25} />
                  Home
                </Link>
                <Link onClick={() => setSidebarCollapsed(true)} href="/account">
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
                className="flex flex-row px-[16px] w-full text-[29px] bg-[#151515] text-white cursor-pointer"
              >
                &times; Close
              </div>
            </nav>

            <section className="flex flex-row justify-center grow">
              <div className="flex flex-col w-full md:w-3/4 px-[16px] my-4">
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
