import { createContext } from "react";

export type WrapperContextPropsConfirmed = {
  contract: any;
  tokenIds: number[];
  rootAggregatorId: number;
  networkName: string;
  denominator: any;
  address: string;
};

export type WrapperContextProps = WrapperContextPropsConfirmed | undefined;

export const WrapperContext = createContext<WrapperContextProps>(undefined);
