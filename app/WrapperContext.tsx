import { createContext } from "react";

type WrapperContextProps =
  | {
      contract: any;
      tokenIds: number[];
      rootAggregatorId: number;
      networkName: string;
      denominator: any;
    }
  | undefined;

export const WrapperContext = createContext<WrapperContextProps>(undefined);
