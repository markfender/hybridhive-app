"use client";

import { useEffect, useState } from "react";

import { useAddress, useConnectionStatus } from "@thirdweb-dev/react";

import { useContext } from "react";
import { WrapperContext } from "../WrapperContext";

type Token = {
  id: number;
  balance: number;
  allowed: boolean;
  globalShare: number;
  globalShareAsPerc: number;
  name: string;
};

export default function Account() {
  const address = useAddress();

  // To trigger a re-render when this changes
  const connectionStatus = useConnectionStatus();
  console.log(connectionStatus);
  const [networkName, setNetworkName] = useState<string | null>(null);
  const wrapperContext = useContext(WrapperContext);

  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const [totalGlobalShare, setTotalGlobalShare] = useState<number>();

  useEffect(() => {
    if (!wrapperContext) return;
    const { contract, tokenIds, rootAggregatorId, networkName, denominator } =
      wrapperContext;

    setNetworkName(networkName);

    Promise.all(
      tokenIds.map(async (id) => ({
        id,
        balance: (
          await contract.call("getTokenBalance", [id, address])
        ).toNumber(),
        allowed: await contract.call("isAllowedTokenHolder", [id, address]),
      }))
    )
      .then((tokens) => tokens.filter((t) => t.allowed || t.balance > 0))
      .then((filteredTokens) =>
        Promise.all(
          filteredTokens.map(async (t) => ({
            ...t,
            globalShare: await contract.call("getGlobalValueShare", [
              rootAggregatorId,
              1,
              t.id,
              t.balance,
            ]),
            name: await contract.call("getEntityName", [1, t.id]),
          }))
        )
          .then((tokens) =>
            tokens.map((t) => ({
              ...t,
              globalShareAsPerc: +(t.globalShare / denominator),
            }))
          )
          .then((detailedTokens) =>
            detailedTokens.sort((a, b) => b.globalShare - a.globalShare)
          )
          .then(
            (tokens) => (
              setTotalGlobalShare(
                tokens.reduce(
                  (acc, item) => (acc + item.globalShareAsPerc) as number,
                  0
                )
              ),
              setFilteredTokens(tokens)
            )
          )
      );
  }, [address, wrapperContext]);

  if (!wrapperContext) {
    return (
      <>
        <p>Waiting for wrapperContext...</p>
      </>
    );
  }

  return (
    <>
      <h1>Account</h1>
      <div className="mt-2 lg:ml-4">
        <div className="flex flex-row items-center">
          <span className="cap-label">Total global share:</span>
          <span className="text-black p-4 bg-[#FFF4D8] font-bold">
            {totalGlobalShare} %
          </span>
        </div>
        <table className="account-table mt-4">
          <thead>
            <tr>
              <th>Token</th>
              <th>Balance</th>
              <th>Global share</th>
            </tr>
          </thead>
          <tbody>
            {filteredTokens.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.balance}</td>
                <td>{item.globalShareAsPerc} %</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="mt-4">Info</h2>
        <p className="break-all">Wallet: {address}</p>
        <p className="">Network: {networkName}</p>
      </div>
    </>
  );
}
