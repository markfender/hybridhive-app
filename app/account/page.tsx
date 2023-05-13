"use client"

import { useRef, useState, useEffect } from 'react'

import { useAddress, useContract, useContractRead, useSDK, useConnectionStatus, useWallet } from '@thirdweb-dev/react'

import { Goerli, Gnosis } from '@thirdweb-dev/chains'

const ROOT_AGGREGATOR_ID = 7

const GOERLI_CONTRACT_ADDRESS = "0xd3860c5Fb068b7f12aA81770dA5556786023ea98"

import GOERLI_CONTRACT_ABI from '@/abi/0xd386_HybridHiveCore'

export default function Account() {
  
  const address = useAddress()

  const wallet = useWallet()

  const sdk = useSDK();

  // To trigger a re-render when this changes
  const connectionStatus = useConnectionStatus();

  const [tokenDataStatus, setTokenDataStatus] = useState<string>("init")

  const [error, setError] = useState<string | null>(null)
  
  const [network, setNetwork] = useState<string | null>(null)
  
  const [balance, setBalance] = useState<string | null>(null)
  
  const [userTokenData, setUserTokenData] = useState<{ [index: number]: any } | null>(null)

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

        /*
        1. Get list of tokens in network: getTokensInNetwork(7)
        2. For each token: getTokenBalance(tokenId, currentUser)
          -  Filter non zero values `getTokenBalance(tokenId, currentUser)` and person is not an allowedHolder `isAllowedHolder(tokenid, currentUser)`
        3. For eaxch token get global share: `getGlobalTokenShare(aggregatorRoot, tokenId, currentUserTokenBalance)` currentUserTokenBalance - from previous step
        4. sum total global shares
        */

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
      
    })().catch(error => setError(String(error)))
  }, [address, sdk, tokenDataStatus])

  if(!address || network == null) {
    
    // Doesn't work
    //if(!address || network == null || connectionStatus !== "connected") {

    // Reset
    if(tokenDataStatus !== "init")
      setTokenDataStatus("init")

    if(balance !== null)
      setBalance(null)

    if(error !== null)
      setError(null)

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
        <p>Loading your token balances...</p>
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
  
  const displayTokenIds = Object.keys(userTokenData!).map(key => parseInt(key)).filter(id => userTokenData![id]['balance'] > 0 || userTokenData![id]['allowed'] == true)

  const tableData: any[] = []

  displayTokenIds.forEach(id => { tableData.push(userTokenData![id]) })

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
          <tr>
            <td>Test token 1</td>
            <td>100</td>
            <td>0.5 %</td>
          </tr>
          <tr>
            <td>Test token 2</td>
            <td>300</td>
            <td>5 %</td>
          </tr>
          <tr>
            <td>Test token 3</td>
            <td>10</td>
            <td>6.5 %</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-[40px]">
        <h2 className="text-5xl mb-4">Info</h2>
        <p className="text-base">Wallet: {address}</p>
        <p className="text-base">Balance: {balance?.substring(0,5)} ETH</p>
        <p className="text-base">Network: {network}</p>
      </div>
    </>
  )
}
