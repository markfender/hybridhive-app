"use client"

import { useContext, useEffect, useState } from "react";
import { WrapperContext } from "../WrapperContext";
import { BigNumber } from "ethers";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
      <>
        <h1>{tree.name}</h1>
        {generateMarkup(tree, true)}
      </>
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
      {!hideName && entityNode.name}
      <ul>
        {entityNode.subentities?.map((e, i) => (
          <li key={i}>{e.subentities ? generateMarkup(e) : e.name}</li>
        ))}
      </ul>
    </>
  );
}