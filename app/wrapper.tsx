"use client";

import { useRef, useState, useEffect, PropsWithChildren } from "react";

import {
  useAddress,
  useSDK,
  useConnectionStatus,
  useWallet,
  useSwitchChain,
  useNetworkMismatch,
} from "@thirdweb-dev/react";

import { Goerli, Gnosis } from "@thirdweb-dev/chains";

const ROOT_AGGREGATOR_ID = 7;

// GNOSIS ONLY
//const CONTRACT_ADDRESS = "0x274f031d2E7f97A0395451DCb19108bB94bBb3f4"
// UPDATING CONTRACT DONT FORGET TO UPDATE ABI
let CONTRACT_ADDRESS = "0x4f5E97dF4a218eD78Ad997a117178119B431699F"; //"0x6256e164DcDE2a6EFfc9b6F3dFa072C9A5e67C29"

import CONTRACT_ABI from "@/abi/gnosis_abi.json";
import { WrapperContext } from "./WrapperContext";
import { BigNumber } from "ethers";

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const [contract, setContract] = useState<any>();
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [denominator, setDenominator] = useState<any>();

  const address = useAddress();

  const wallet = useWallet();

  const sdk = useSDK();

  const switchChain = useSwitchChain();

  const hasMismatch = useNetworkMismatch();

  // To trigger a re-render when this changes
  const connectionStatus = useConnectionStatus();
  console.log(connectionStatus);
  const [tokenDataStatus, setTokenDataStatus] = useState<string>("init");
  const [error, setError] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [userTokenData, setUserTokenData] = useState<{
    [index: number]: any;
  } | null>(null);

  useEffect(() => {
    (async () => {
      if (tokenDataStatus == "init") {
        if (!address || !sdk || !sdk?.wallet) {
          return;
        }

        const chainId = await sdk!.wallet.getChainId();

        let contract_address;
        let contract_abi;

        if (chainId == Goerli.chainId) {
          setNetwork("Goerli");

          // alert("we are on goerli")
          contract_address = CONTRACT_ADDRESS;
          contract_abi = CONTRACT_ABI;
        } else if (chainId == Gnosis.chainId) {
          setNetwork("Gnosis");
          // alert("we are on gnosis")
          contract_address = CONTRACT_ADDRESS;
          contract_abi = CONTRACT_ABI;
        } else {
          setNetwork("unsupported");
          return;
        }

        //alert(chainId)
        //alert(await sdk!.wallet.getAddress())

        setTokenDataStatus("loading");

        const balance = await sdk!.wallet.balance();

        console.log("Balance:", balance, balance.displayValue);

        //alert("Balance:" + balance.displayValue)

        setBalance(balance.displayValue);

        /*
        1. Get list of tokens in network: getTokensInNetwork(7)
        2. For each token: getTokenBalance(tokenId, currentUser)
          -  Filter non zero values `getTokenBalance(tokenId, currentUser)` and person is not an allowedHolder `isAllowedHolder(tokenid, currentUser)`
        3. For eaxch token get global share: `getGlobalTokenShare(aggregatorRoot, tokenId, currentUserTokenBalance)` currentUserTokenBalance - from previous step
        4. sum total global shares
        */

        const contract = await sdk!.getContract(
          contract_address as string,
          contract_abi as any
        );

        setContract(contract);

        let denominator = await contract.call("DENOMINATOR", []);
        denominator = denominator * denominator; // @todo replace after DENOMINATOR update
        setDenominator(denominator);

        //alert("Denominator:" + String(denominator))

        const tokenIds: number[] = await contract.call("getTokensInNetwork", [
          ROOT_AGGREGATOR_ID,
        ]);
        // .map((e: BigNumber) => e.toNumber());
        setTokenIds(tokenIds);

        //alert("Tokens in network:" + tokenIds.join(", "))

        const tokenData: { [index: number]: any } = {};

        tokenIds.forEach((id) => {
          tokenData[id] = {
            balance: undefined,
            allowed: undefined,
            global_share: undefined,
            global_share_perc: undefined,
            token_name: undefined,
          };
        });

        const balancePromise = await Promise.all(
          tokenIds.map((id) => contract.call("getTokenBalance", [id, address]))
        );
        const allowedPromise = Promise.all(
          tokenIds.map((id) =>
            contract.call("isAllowedTokenHolder", [id, address])
          )
        );

        const balanceResult = await balancePromise;
        const allowedResult = await allowedPromise;

        tokenIds.forEach((item, index) => {
          tokenData[item]["balance"] = balanceResult[index].toNumber();
          tokenData[item]["allowed"] = allowedResult[index];
        });

        //alert(JSON.stringify(tokenData))

        // balance = 0, allowed = true: display a token that you are allowed to hold even though you have a zero balance
        // balance > 0, allowed = false: display frozen assets
        const displayTokenIds = tokenIds.filter(
          (id) =>
            tokenData[id]["balance"] > 0 || tokenData[id]["allowed"] == true
        );

        //alert("Display tokens:" + displayTokenIds.join(", "))
        const globalSharePromise = Promise.all(
          displayTokenIds.map((id) =>
            contract.call("getGlobalValueShare", [
              ROOT_AGGREGATOR_ID,
              1, // TOKEN entity type
              id,
              tokenData[id]["balance"],
            ])
          )
        );

        const tokenNamePromise = Promise.all(
          displayTokenIds.map((id) => contract.call("getEntityName", [1, id]))
        );

        const globalShareResult = await globalSharePromise;
        const tokenNameResult = await tokenNamePromise;
        try {
          displayTokenIds.forEach((item, index) => {
            tokenData[item]["global_share"] = globalShareResult[index];
            tokenData[item]["global_share_perc"] =
              globalShareResult[index] / denominator;
            tokenData[item]["token_name"] = tokenNameResult[index];
          });
        } catch (e) {
          console.log(e);
        }

        //alert(JSON.stringify(tokenData))

        setUserTokenData(tokenData);

        setTokenDataStatus("done");
      }
    })().catch((error) => setError(String(error)));
  }, [address, sdk, tokenDataStatus]);

  if (!address || network == null) {
    // Doesn't work
    //if(!address || network == null || connectionStatus !== "connected") {

    // Reset
    if (tokenDataStatus !== "init") setTokenDataStatus("init");

    if (balance !== null) setBalance(null);

    if (error !== null) setError(null);

    return (
      <>
        <div className="flex flex-col relative max-w-5xl mx-auto py-20 sm:py-24 lg:py-28">
          <h1 className="self-center md:self-start h-[4rem] sm:h-[5rem] lg:h-[6.5rem] font-extrabold text-transparent text-6xl sm:text-7xl lg:text-8xl bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-300">
            hybridhive
          </h1>
          <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
            a protocol to combine the benefits of single and multi-currency
            systems
          </h1>
          <p className="mt-9 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
            Connect wallet to start with hybridhive
          </p>
        </div>
      </>
    );
  }

  if (tokenDataStatus == "loading" || userTokenData == null) {
    return (
      <>
        <p>Loading your token balances...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <p>Error: {error}</p>
      </>
    );
  }

  if (network == "unsupported") {
    return (
      <>
        <p>
          The network that you chose is unsupported. Supported: Goerli, Gnosis.
        </p>
      </>
    );
  }

  const displayTokenIds = Object.keys(userTokenData!)
    .map((key) => parseInt(key))
    .filter(
      (id) =>
        userTokenData![id]["balance"] > 0 ||
        userTokenData![id]["allowed"] == true
    );

  const tableData: any[] = [];

  displayTokenIds.forEach((id) => {
    tableData.push(userTokenData![id]);
  });

  // const orderedTableData = tableData.sort(
  //   (a, b) => b.global_share - a.global_share
  // );

  // const totalGlobalShare = orderedTableData.reduce(
  //   (acc, item) => (acc + item.global_share_perc) as number,
  //   0
  // );

  return (
    <WrapperContext.Provider
      value={{
        contract,
        tokenIds,
        rootAggregatorId: ROOT_AGGREGATOR_ID,
        networkName: network,
        denominator,
        address,
      }}
    >
      {children}
    </WrapperContext.Provider>
  );
};

export default Wrapper;
