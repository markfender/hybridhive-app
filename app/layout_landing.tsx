"use client";

import "./globals.css";

import { ConnectWallet } from "@thirdweb-dev/react";

import Image from "next/image";

import HHLogo from "@/public/hhlogo.svg";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-start min-h-screen">
      {/* <Header switchSidebar={switchSidebar} /> */}

      <header className="flex flex-row p-[16px] lg:px-[32px] bg-white grow-0">
        <div className="flex flex-row justify-between align-center w-[100%]">
          <div className="flex flex-row items-center">
            <Image src={HHLogo} alt="" className="mr-4 w-[32px]" />
          </div>
          <ConnectWallet className="connect-wallet-button" theme="light" />
        </div>
      </header>

      <section className="flex flex-row justify-center grow">
        <div className="flex flex-col w-full md:w-3/4">{children}</div>
      </section>
      <footer className="flex flex-row justify-center bg-white py-[5px] grow-0">
        <p className="text-lg text-[#222]">© 2023 hybridhive</p>
      </footer>
    </div>
  );
}
