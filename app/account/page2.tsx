"use client"

import { useSDK } from '@thirdweb-dev/react'

import { useState, useEffect, useCallback } from 'react'

import GOERLI_CONTRACT_ABI from '@/abi/0xd386_HybridHiveCore'

const NETWORK_DATA = {
  // Goerli
  5: {
    root_aggregator_id: 1,
    // contract_address: "0x48970e9366E603eF443B07180075237aC4426ac4",
    contract_abi: GOERLI_CONTRACT_ABI,
  },
  // Gnosis
  100: {
    root_aggregator_id: 1,
    contract_address: "0x274f031d2E7f97A0395451DCb19108bB94bBb3f4",
    contract_abi: undefined,
  },
};

/*
Prev Goerli
const ROOT_AGGREGATOR_ID = 7

const CONTRACT_ADDRESS = "0xd3860c5Fb068b7f12aA81770dA5556786023ea98"

import CONTRACT_ABI from '@/abi/0xd386_HybridHiveCore'
*/

export default function Account() {

  const [address, setAddress] = useState<string | null>(null)

  const [chainId, setChainId] = useState<number | null>(null)

  const sdk = useSDK();

  const [tokenData, setTokenData] = useState<{ [index: number]: any } | null>(null)

  const [isLoadingData, setIsLoadingData] = useState<boolean>(false)

  /*
   * Sync with wallet adapter
   */

  const updateWallet = useCallback(async () => {

    console.log("Update wallet")

    if (!sdk) {
      return
    }

    const wallet = sdk!.wallet

    if (!wallet.isConnected()) {
      return
    }

    const currentChainId = await wallet.getChainId()
    const currentAddress = await wallet.getAddress()

    if (chainId != currentChainId || address != currentAddress) {
      
      console.log(currentAddress, currentChainId)

      setChainId(currentChainId)
      setAddress(currentAddress)

      // TODO: Reset
    }

  }, [sdk, address, chainId])

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateWallet().catch(console.error)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  })

  /*
   * Load token balances
   */

  useEffect(() => {
    (async () => {
      
      return

      if (tokenData !== null) {
        return
      }

      if (address === null || chainId === null) {
        return
      }

      if (!sdk || !sdk?.wallet) {
        return
      }

      /*
      const balance = await sdk!.wallet.balance()

      console.log("Balance:", balance.displayValue)

      alert("Balance:" + balance.displayValue)
      */

      try {
        setIsLoadingData(true)

        /*
        1. Get list of tokens in network: getTokensInNetwork(7)
        2. For each token: getTokenBalance(tokenId, currentUser)
          -  Filter non zero values `getTokenBalance(tokenId, currentUser)` and person is not an allowedHolder `isAllowedHolder(tokenid, currentUser)`
        3. For eaxch token get global share: `getGlobalTokenShare(aggregatorRoot, tokenId, currentUserTokenBalance)` currentUserTokenBalance - from previous step
        4. sum total global shares
        */

        const chainIdIndex = chainId as keyof typeof NETWORK_DATA
        const contract_address: string = NETWORK_DATA[chainIdIndex].contract_address
        const contract_abi: any = NETWORK_DATA[chainIdIndex].contract_abi

        /*
          const contract = await sdk!.getContract(contract_address as string, contract_abi as any);
          
          const denominator = (await contract.call("DENOMINATOR",[])).toNumber()
          
          alert("Denominator:" + String(denominator))
  
          const tokenIds: number[] = await contract.call("getTokensInNetwork", [ROOT_AGGREGATOR_ID])
          
          alert("Tokens in network:" + tokenIds.join(", "))
  
          const tokenData: { [index: number]: any } = {}
  
          tokenIds.forEach(id => {
            tokenData[id] = {
              balance: undefined,
              allowed: undefined,
              global_share: undefined,
              global_share_perc: undefined,
              token_name: undefined
            }
          })
          
          const balancePromise = Promise.all(tokenIds.map(id => contract.call("getTokenBalance", [id, address]))) 
          const allowedPromise = Promise.all(tokenIds.map(id => contract.call("isAllowedTokenHolder", [id, address]))) 
  
          const balanceResult = await balancePromise
          const allowedResult = await allowedPromise
  
          tokenIds.forEach((item, index) => {
            tokenData[item]['balance'] = balanceResult[index].toNumber();
            tokenData[item]['allowed'] = allowedResult[index];
          })
  
          alert(JSON.stringify(tokenData))
          
          // balance = 0, allowed = true: display a token that you are allowed to hold even though you have a zero balance
          // balance > 0, allowed = false: display frozen assets
          const displayTokenIds = tokenIds.filter(id => tokenData[id]['balance'] > 0 || tokenData[id]['allowed'] == true)
          
          alert("Display tokens:" + displayTokenIds.join(", "))
  
          const globalSharePromise = Promise.all(displayTokenIds.map(id => contract.call("getGlobalTokenShare", [ROOT_AGGREGATOR_ID, id, tokenData[id]['balance']])))
          const tokenNamePromise = Promise.all(displayTokenIds.map(id => contract.call("getEntityName", [1,id])))
          
          const globalShareResult = await globalSharePromise
          const tokenNameResult = await tokenNamePromise
  
          displayTokenIds.forEach((item, index) => {
            tokenData[item]['global_share'] = globalShareResult[index].toNumber();
            tokenData[item]['global_share_perc'] = globalShareResult[index].toNumber() / denominator * 100;
            tokenData[item]['token_name'] = tokenNameResult[index];
          })
          
          alert(JSON.stringify(tokenData))
          
          setUserTokenData(tokenData)
  
          setTokenDataStatus("done")
        }
        */

      } catch (error: any) {
        console.error(String(error))
      } finally {
        setIsLoadingData(false)
      }

    })().catch(error => alert(String(error)))

  }, [address, chainId, sdk, tokenData])

  if (address === null || chainId === null) {
    return (
      <>
        <h1>Account</h1>
        <p>Please connect your wallet.</p>
      </>
    )
  }

  if (isLoadingData) {
    return (
      <>
        <h1>Account</h1>
        <p>Loading your token balances...</p>
      </>
    )
  }

  const displayTokenIds = Object.keys(tokenData!).map(key => parseInt(key)).filter(id => tokenData![id]['balance'] > 0 || tokenData![id]['allowed'] == true)

  const tableData: any[] = []

  displayTokenIds.forEach(id => { tableData.push(tokenData![id]) })

  const orderedTableData = tableData.sort((a, b) => b.global_share - a.global_share);

  const totalGlobalShare = orderedTableData.reduce((acc, item) => acc + item.global_share_perc as number, 0)

  return (
    <>
      <h1>Account</h1>

      <div className="text-2xl mt-[50px] mb-[60px]">
        <span className="cap-label">Total global share:</span>
        <span className='text-black p-4 bg-[#FFF4D8] font-bold ml-4'>{totalGlobalShare}%</span>
      </div>
      <table className="account-table">
        <thead>
          <tr>
            <th>Token</th>
            <th>Balance</th>
            <th>Global share</th>
          </tr>
        </thead>
        <tbody>
          {
            orderedTableData.map((item, index) => (
              <tr key={item.token_name}>
                <td>{item.token_name}</td>
                <td>{item.balance}</td>
                <td>{item.global_share_perc}%</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div className="mt-[40px]">
        <h2 className="text-5xl mb-4">Info</h2>
        <p className="text-base">Wallet: {address}</p>
        <p className="text-base">Chain ID: {chainId}</p>
      </div>
    </>
  )

}
