"use client"

import { useContext, useEffect, useState } from "react";
import { WrapperContext } from "../WrapperContext";
import { BigNumber } from "ethers";

enum EntityType {
  Token = 1,
  Aggregator = 2,
}

type EntityNode = {
  name: string;
  subentities?: EntityNode[];
};

export default function Network() {
  const wrapperContext = useContext(WrapperContext);

  useEffect(() => {
    if (!wrapperContext) return;

    const { contract, rootAggregatorId } = wrapperContext;

    async function lookUpToken(tokenId: number) {
      return {
        name: await contract.call("getEntityName", [1, tokenId]),
        // type: EntityType.Token,
      };
    }

    async function lookUpAggregator(aggregatorId: number) {
      const name = await contract.call("getEntityName", [2, aggregatorId]);

      const [aggregatorType, aggregatorSubentities] = await contract
        .call("getAggregatorSubEntities", [aggregatorId])
        .then(([type, subentities]: [number, BigNumber[]]) => [
          type,
          subentities.map((e) => e.toNumber()),
        ]);

      return {
        name,
        // type: EntityType.Aggregator,
        subentities: await Promise.all(
          aggregatorSubentities.map(
            aggregatorType === EntityType.Token ? lookUpToken : lookUpAggregator
          )
        ),
      };
    }

    lookUpAggregator(rootAggregatorId).then(setTree);
  }, [wrapperContext]);

  const [tree, setTree] = useState<EntityNode>();

  return wrapperContext ? (
    tree ? (
      <div style={{ width: "100%" }}>
        <h1>Network structure</h1>
        {generateMarkup(tree, true)}
      </div>
    ) : (
      <>Waiting for tree...</>
    )
  ) : (
    <>Waiting for wrapperContext...</>
  );
}

function generateMarkup(entityNode: EntityNode, hideName?: boolean) {
  return (
    <>
      <div className="mx-auto max-w-lg pl-10">
        <div className="divide-y divide-gray-100">
          <details className="group" open>
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-secondary-900 group-open:text-primary-500">
              {entityNode.name}
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="block h-5 w-5 group-open:hidden"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="hidden h-5 w-5 group-open:block"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              </div>
            </summary>
            <div className="pb-4 text-secondary-500">
              {entityNode.subentities?.map((e, i) =>
                e.subentities ? generateMarkup(e) : <li key={i}>{e.name}</li>
              )}
            </div>
          </details>
        </div>
      </div>
    </>
  );
}