"use client"

import { useContext, useEffect, useState } from "react";
import {
  WrapperContext,
  WrapperContextProps,
  WrapperContextPropsConfirmed,
} from "../WrapperContext";
import { BigNumber } from "ethers";
import { contractType, useAddress } from "@thirdweb-dev/react";
import { ArrowPathIcon } from '@heroicons/react/20/solid'


function useWrapperContext(
  callback?: (wrapperContext: WrapperContextPropsConfirmed) => void
) {
  const wrapperContext = useContext(WrapperContext);

  useEffect(() => {
    if (!wrapperContext) return;

    callback?.(wrapperContext);
  }, [callback, wrapperContext]);

  return wrapperContext;
}

type TokenInfo = {
  id: number;
  name: string;
  balance: number;
};

export default function Home() {
  const [tokenInfos, setTokenInfos] = useState<TokenInfo[]>([]);
  const [fromTokenInfos, setFromTokenInfos] = useState<TokenInfo[]>([]);
  const [activeToken, setActiveToken] = useState<TokenInfo>();
  const [tokenTo, setTokenTo] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [amonutToSend, setAmountToSend] = useState<string>(""); // @todo replace with numbers
  const [globalShareTransfer, setGlobalShareTransfer] = useState<string>("");

  const [isLoadingTransfer, setIsLoadingTransfer] = useState<boolean>(false);
useState<string>("");
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState<boolean>(false);

  const [linkToTransaction, setLinkToTransaction] = useState<string>("");

  const wrapperContext = useWrapperContext(
    async ({ contract, tokenIds, address }) => {
      Promise.all(
        (tokenIds as unknown as BigNumber[]).map(async (e) => {
          const obj = {
            id: e.toNumber(),
            name: await contract.call("getEntityName", [1, e.toNumber()]),
            balance: await contract.call("getTokenBalance", [
              e.toNumber(),
              address,
            ]),
          };
          // return {
          //   id: e.toNumber(),
          //   name: await contract.call("getEntityName", [1, e]),
          //   // balance: await contract.call("getTokenBalance", [
          //   //   activeTokenId,
          //   //   address,
          //   // ]),
          //   balance: 0,
          // };
          return obj;
        })
      )
        .then((tokenInfos) => {
          setTokenInfos(tokenInfos);
          return tokenInfos.filter((t) => t.balance > 0);
        })
        .then(async (tokenInfos) => {
          setFromTokenInfos(tokenInfos);
          setActiveToken(tokenInfos[0]);
          // setActiveTokenId(tokenInfos[0].id);
          // const max = await contract.call("getTokenBalance", [
          //   tokenInfos[0].id,
          //   address,
          // ]);
          // console.log("max", max);
          // setMax(max);
        });
      
       
      
    }
  );
  const handleGlobalTransfer = async () => {
    //0xF977814e90dA44bFA03b6295A0616a897441aceC
    console.log(wrapperContext)
    console.log(activeToken?.id, tokenTo?.id, recipient, amonutToSend)
    setIsLoadingTransfer(true)
    /*let globalTransferTransaction = await setTimeout(()=> {
      setIsLoadingTransfer(false)
    }, 1500);*/
    let globalTransferTransaction = await wrapperContext?.contract.call("globalTransfer", [
      activeToken?.id,
      tokenTo?.id,
      wrapperContext?.address,
      recipient,
      amonutToSend
    ]);
    setLinkToTransaction(globalTransferTransaction?.receipt?.transactionHash); // @todo display modal based on it*/
    setIsTransactionModalOpen(true);
    setRecipient("");
  }
  const closeModal = () => {
    console.log("test")
    setIsTransactionModalOpen(false)
  }

  const calculateGlobalTransferShart = async () => {

  }
  // const [max, setMax] = useState<number>();

  // useEffect(() => {
  //   if (!(wrapperContext && activeTokenId)) return;

  //   wrapperContext.contract
  //     .call("getTokenBalance", [activeTokenId, wrapperContext.address])
  //     .then((response: BigNumber) => setMax(response.toNumber()));
  // }, [wrapperContext, activeTokenId]);
  // @todo add preloader status 
  
  return wrapperContext ? (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1em",
      }}
    >
      <h1>Transfer</h1>

      <div className="w-full mx-auto max-w-xs">
        <div>
          <label
            htmlFor="example1"
            className="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5"
          >
            Token From
          </label>
          <select
            id="example1"
            className="block w-full rounded-md 300 shadow-sm focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            onChange={(e) => {
              setActiveToken(fromTokenInfos.find((t) => t.id == e.target.value))
            }}
          >
            {fromTokenInfos.map((e, i) => (
              <option key={i} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full mx-auto max-w-xs">
        <div>
          <label
            htmlFor="example2"
            className="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5"
          >
            Token To
          </label>
          <select
            id="example2"
            className="block w-full rounded-md focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
            onChange={(e) => {
              setTokenTo(tokenInfos.find((t) => t.name == e.target.value))
            }}
          >
            {tokenInfos.map((e, i) => (
              <option key={i}>{e.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* <input placeholder="Token From" />
      <input placeholder="Token To" /> */}
      {/* <input placeholder="Recipient" /> */}
      <div className="w-full mx-auto max-w-xs">
        <div>
          <label
            htmlFor="example3"
            className="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5"

          >
            Recipient 
          </label>
          <input
            id="example3"
            className="block w-full rounded-md focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="0x..."
            type="text"
            onInput={(e) => setRecipient(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full mx-auto max-w-xs">
        <div>
          <label
            htmlFor="example4"
            className="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5"
          >
            Amount
          </label>
          {/* <input
            id="example4"
            className="block w-full rounded-md border-red-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            type="number"
            min={1}
            placeholder="1"
          /> */}
          <div className="relative z-0 flex">
            <input
              id="example4"
              className="block w-full rounded-md rounded-r-none focus:z-10 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              type="text" // @todo replace to number
              min={0}
              placeholder="0"
              onInput={(e) => {
                setAmountToSend(e.target.value);
    
                const timeOutId = setTimeout(async () => {
                  const globalShareValue = await wrapperContext.contract.call("getGlobalValueShare",[
                    wrapperContext.rootAggregatorId,
                    1,
                    activeToken?.id,
                    e.target.value
                  ])
                  setGlobalShareTransfer(globalShareValue/wrapperContext.denominator)
                }, 500);
                return () => clearTimeout(timeOutId);
                
              }}
            />
            <div className="inline-flex items-center inset-y-0 left-0 items-center rounded-md rounded-l-none border border-l-0 border-gray-300 bg-gray-100 px-2.5 text-gray-700">
              {`${(activeToken?.balance as any)?.toNumber()}`}
            </div>
          </div>
          {amonutToSend!="" && !!globalShareTransfer ? 
          <div
            className="mt-1 text-sm"
            style={{ fontSize: "1em" }}
          >

            Global share: {globalShareTransfer.toFixed(2)}%
          </div>: <></>}
        </div>
      </div>

      {/* <div> */}
      <button
        type="button"
        className="inline-flex items-center rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
        disabled={isLoadingTransfer}
        onClick={handleGlobalTransfer}
      >
        {isLoadingTransfer ?
          <><ArrowPathIcon className="animate-spin mr-2" width={20} height={20} /> Sending...</> :
          <>Send</>
        }
      </button>
      {/* </div> */}
      <div id="popup-modal" tabIndex="-1" className={"fixed flex items-center justify-center top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[100%] bg-[#151515] bg-opacity-60 max-h-full " + (isTransactionModalOpen ?"" : "hidden")}>
        <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-black rounded-lg shadow dark:bg-g-700">
                <div className="p-6 text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Transaction is sent</h3>
                    <a className="block text-white underline mb-5" href={`https://goerli.etherscan.io/tx/${linkToTransaction}`} target="_blank">View transaction in the block explorer</a>
                    <button onClick={closeModal} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Ok</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  ) : (
    <>Waiting for wrapperContext...</>
  );
}
  