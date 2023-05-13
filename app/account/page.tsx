"use client"

import { useRef, useState, useEffect } from 'react'

import { useAddress, useContract, useContractRead, useSDK } from '@thirdweb-dev/react'

const ROOT_AGGREGATOR_ID = 7

const CONTRACT_ADDRESS = "0xd3860c5Fb068b7f12aA81770dA5556786023ea98"

import CONTRACT_ABI from '@/abi/0xd386_HybridHiveCore.ts'

export default function Account() {
  
  const address = useAddress()

  const sdk = useSDK();

  const [tokenDataStatus, setTokenDataStatus] = useState<string>("init")

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {

      if(!address) {
        return
      }

      if(tokenDataStatus == "init") {

        setTokenDataStatus("loading")

        const balance = await sdk.wallet.balance()
        console.log("Balance:", balance)

        const contract = await sdk.getContract(CONTRACT_ADDRESS, CONTRACT_ABI);

        console.log("Get DENOMINATOR...")

        const data = await contract.call("DENOMINATOR", [])

        console.log(data)
        console.log(data.toString())
        console.log(data.toNumber())

        setTokenDataStatus("done")

        /*

        console.log("Load account data...")
        const data = await contract.call("DENOMINATOR", [])
        
        console.log(data)
        console.log(data.toString())
        console.log(data.toNumber())

        //const tokensInNetwork = await contract.call("getTokenBalance", [])
        */
      }
      
    })().catch(error => setError(String(error)))
  })

  if(!address) {
    return (
      <>
        <h1>Account</h1>
        <p>No wallet connected.</p>
      </>
    )
  }

  if(tokenDataStatus == "loading") {
    return (
      <>
        <h1>Account</h1>
        <p>Loading...</p>
      </>
    )
  }

  if(error) {
    return (
      <>
        <h1>Account</h1>
        <p>Error: {error}</p>
      </>
    )
  }

  return (
    <>
      <h1>Account</h1>
      <p>Wallet: {address}</p>

      <p>Total global share: x%</p>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Balance</th>
            <th>Global share</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Token A</td>
            <td>100</td>
            <td>0.1%</td>
          </tr>
          <tr>
            <td>Token B</td>
            <td>100</td>
            <td>0.1%</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
