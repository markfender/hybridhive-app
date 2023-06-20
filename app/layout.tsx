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
          <Wrapper>{children}</Wrapper>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
