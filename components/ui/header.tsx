"use client";

import {
  ConnectWallet,
  useConnectionStatus,
  useSDK,
  useAddress,
} from "@thirdweb-dev/react";
import Image from "next/image";
import HHLogo from "@/public/hhlogo.svg";

type HeaderProps = {
  switchSidebar: () => void;
};

export default function Header(props: HeaderProps) {
  const { switchSidebar } = props;
  const connectionStatus = useConnectionStatus();
  const address = useAddress();
  const sdk = useSDK();

  return (
    <header
      className={`flex flex-row p-[16px] lg:px-[32px] bg-white grow-0 ${
        address ? "border" : ""
      }`}
    >
      <div className="flex flex-row justify-between align-center w-[100%]">
        <div className="flex flex-row items-center">
          <button
            onClick={switchSidebar}
            className={`flex justify-center items-center w-[52px] h-[52px] bg-yellow-300 rounded-full md:rounded-none fixed bottom-[30px] right-[40px] md:relative md:bottom-0 md:right-0 md:bg-transparent md:text-slate-900 z-[98] text-[20px] md:text-[22px] font-bold lg:hidden ${
              address ? "" : "hidden"
            }`}
          >
            &#9776;
          </button>
          <Image src={HHLogo} alt="" className="mr-4 w-[32px]" />
          <h1 className=" text-[0] md:text-[2rem]  text-slate-900">
            {address ? "hybridhive" : ""}
          </h1>
        </div>
        <ConnectWallet className="connect-wallet-button" theme="light" />
      </div>
    </header>
  );
}
