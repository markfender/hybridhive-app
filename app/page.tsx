"use client"

import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {
  return (
    <main>
      <h1>HybridHive</h1>
      <h2>Connect wallet</h2>
      <ConnectWallet />
    </main>
  )
}
