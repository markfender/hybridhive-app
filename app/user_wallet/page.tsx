"use client"

import { useSDK } from '@thirdweb-dev/react'

import { useState, useEffect, useRef, useCallback } from 'react'

export default function User_Wallet() {

  const sdk = useSDK();

  const [address, setAddress] = useState<string | null>(null)

  const [chainId, setChainId] = useState<number | null>(null)

  const [balance, setBalance] = useState<string | null>(null)

  const updateWallet = useCallback(async () => {
    
    console.log("Update wallet")

    if (!sdk) {
      return
    }

    const wallet = sdk!.wallet

    if (!wallet.isConnected()) {
      console.error(new Error("Not connected"))
      return
    }

    const currentChainId = await wallet.getChainId()
    if (chainId != currentChainId) {
      setChainId(currentChainId)
    }

    const currentAddress = await wallet.getAddress()
    if (address != currentAddress) {
      setAddress(currentAddress)
    }

    const currentBalance = (await wallet.balance()).displayValue
    if (balance != currentBalance) {
      setBalance(currentBalance)
    }
  }, [sdk, address, chainId, balance])

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateWallet().catch(console.error)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  })

  return (
    <>
      <h1>User Wallet</h1>
      <p>Address: {address}</p>
      <p>Chain Id: {chainId}</p>
      <p>Balance: {balance}</p>
    </>
  )

}
