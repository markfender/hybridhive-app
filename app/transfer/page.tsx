"use client"

import { useContext, useEffect, useState } from "react";
import {
  WrapperContext,
  WrapperContextProps,
  WrapperContextPropsConfirmed,
} from "../WrapperContext";
import { BigNumber } from "ethers";
import { useAddress } from "@thirdweb-dev/react";

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
          console.log("obj", obj);
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

  const [tokenInfos, setTokenInfos] = useState<TokenInfo[]>([]);
  const [fromTokenInfos, setFromTokenInfos] = useState<TokenInfo[]>([]);

  const [activeToken, setActiveToken] = useState<TokenInfo>();
  // const [max, setMax] = useState<number>();

  // useEffect(() => {
  //   if (!(wrapperContext && activeTokenId)) return;

  //   wrapperContext.contract
  //     .call("getTokenBalance", [activeTokenId, wrapperContext.address])
  //     .then((response: BigNumber) => setMax(response.toNumber()));
  // }, [wrapperContext, activeTokenId]);

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

      <div className="mx-auto max-w-xs">
        <div>
          <label
            htmlFor="example1"
            className="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']"
          >
            Token From
          </label>
          <select
            id="example1"
            className="block w-full rounded-md border-red-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            onChange={(e) => (
              console.log(e.target.value),
              setActiveToken(fromTokenInfos.find((t) => t.id == e.target.value))
            )}
          >
            {fromTokenInfos.map((e, i) => (
              <option key={i} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mx-auto max-w-xs">
        <div>
          <label
            htmlFor="example2"
            className="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']"
          >
            Token To
          </label>
          <select
            id="example2"
            className="block w-full rounded-md border-red-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
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
      <div className="mx-auto max-w-xs">
        <div>
          <label
            htmlFor="example3"
            className="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']"
          >
            Recipient
          </label>
          <input
            id="example3"
            className="block w-full rounded-md border-red-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="0x..."
            type="text"
          />
          <div
            className="mt-1 text-sm text-red-500"
            style={{ fontSize: "1em" }}
          >
            Invalid recipient.
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-xs">
        <div>
          <label
            htmlFor="example4"
            className="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']"
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
              className="block w-full rounded-md rounded-r-none border-gray-300 shadow-sm focus:z-10 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              type="number"
              min={1}
              placeholder="1"
            />
            <div className="inset-y-0 left-0 flex items-center rounded-md rounded-l-none border border-l-0 border-gray-300 bg-gray-100 px-2.5 text-gray-700">
              Max: {(activeToken?.balance as any)?.toNumber()}
            </div>
          </div>
          <div
            className="mt-1 text-sm text-red-500"
            style={{ fontSize: "1em" }}
          >
            Invalid amount.
          </div>
        </div>
      </div>

      {/* <div> */}
      <button
        type="button"
        className="rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
      >
        Send
      </button>
      {/* </div> */}
    </div>
  ) : (
    <>Waiting for wrapperContext...</>
  );
}
  