"use client"

import { useRef, useState, useEffect } from 'react'

import { useAddress, useContract, useContractRead, useSDK } from '@thirdweb-dev/react'

import { Goerli, Gnosis } from '@thirdweb-dev/chains'

const ROOT_AGGREGATOR_ID = 7

const GOERLI_CONTRACT_ADDRESS = "0xd3860c5Fb068b7f12aA81770dA5556786023ea98"

import GOERLI_CONTRACT_ABI from '@/abi/0xd386_HybridHiveCore'

export default function Account() {
  
  const address = useAddress()

  const sdk = useSDK();

  const [tokenDataStatus, setTokenDataStatus] = useState<string>("init")

  const [error, setError] = useState<string | null>(null)
  
  const [network, setNetwork] = useState<string | null>(null)
  
  const [balance, setBalance] = useState<string | null>(null)

  useEffect(() => {
    (async () => {

      if(tokenDataStatus == "init") {

        if(!address || !sdk || !sdk?.wallet) {
          return
        }
        
        const chainId = await sdk!.wallet.getChainId()
        
        let contract_address;
        let contract_abi;
        
        if( chainId == Goerli.chainId ) {
          setNetwork("Goerli")
          contract_address = GOERLI_CONTRACT_ADDRESS;
          contract_abi = GOERLI_CONTRACT_ABI;
          
        } else if( chainId == Gnosis.chainId ) {
          setNetwork("Gnosis")
          // TODO

        } else {
          setNetwork("unsupported")
          return
        }

        setTokenDataStatus("loading")

        const balance = await sdk!.wallet.balance()

        console.log("Balance:", balance.displayValue)

        alert("Balance:" + balance.displayValue)
        
        setBalance(balance.displayValue)

        const contract = await sdk!.getContract(contract_address as string, contract_abi as any);

        const tokensInNetwork = await contract.call("getTokensInNetwork", [ROOT_AGGREGATOR_ID])
        
        alert("Tokens in network:" + tokensInNetwork.join(", "))

        setTokenDataStatus("done")
      }
      
    })().catch(error => setError(String(error)))
  }, [address, sdk, tokenDataStatus])

  if(!address || network == null) {
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

  if(network == "unsupported") {
    return (
      <>
        <h1>Account</h1>
        <p>The network that you chose is unsupported. Supported: Goerli, Gnosis.</p>
      </>
    )
  }

  return (
    <>
      <h1>Account</h1>
      <p>Wallet: {address}</p>
      <p>Balance: {balance}</p>
      <p>Network: {network}</p>

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
