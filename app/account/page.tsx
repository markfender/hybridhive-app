"use client"

import { useRef, useState, useEffect } from 'react'

import { useAddress, useContract, useContractRead, useSDK } from '@thirdweb-dev/react'

const ROOT_AGGREGATOR_ID = 7

const CONTRACT_ADDRESS = "0xd3860c5Fb068b7f12aA81770dA5556786023ea98"

import CONTRACT_ABI from '@/abi/0xd386_HybridHiveCore.ts'

export default function Account() {
  
  const address = useAddress()

  const { contract, isContractLoading, contractError } = useContract(CONTRACT_ADDRESS, CONTRACT_ABI)

  const [generalError, setGeneralError] = useState<string | null>(null)

  const sdk = useSDK();

  const isTokenDataLoaded = useRef<boolean>(false)

  useEffect(() => {
    (async () => {

      if(!isTokenDataLoaded.current && !isContractLoading && !contractError) {

        isTokenDataLoaded.current = true

        console.log("Load account data...")
        const data = await contract.call("DENOMINATOR", [])
        
        console.log(data)
        console.log(data.toString())
        console.log(data.toNumber())

        //const tokensInNetwork = await contract.call("getTokenBalance", [])
      }
      
    })().catch(error => setGeneralError(String(error)))
  })

  if(!address) {
    return (
      <>
        <h1>Account</h1>
        <p>No wallet connected.</p>
      </>
    )
  }

  if(isContractLoading) {
    return (
      <>
        <h1>Account</h1>
        <p>Loading...</p>
      </>
    )
  }

  if(contractError) {
    setGeneralError(contractError)
  }

  if(generalError) {
    return (
      <>
        <h1>Account</h1>
        <p>Error: {generalError}</p>
      </>
    )
  }

  return (
    <>
      <h1>Account</h1>
      <p>Wallet: {address}</p>

      <p>Total global share: x%</p>
      <table>
        <tr>
          <th>Token</th>
          <th>Balance</th>
          <th>Global share</th>
        </tr>
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
      </table>
    </>
  )
}
