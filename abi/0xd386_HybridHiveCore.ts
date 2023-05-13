const ABI = [
  {
    "inputs": [],
    "name": "DENOMINATOR",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_newAllowedHolder",
        "type": "address"
      }
    ],
    "name": "addAllowedHolder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "status",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "tokenFromId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "tokenToId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          }
        ],
        "internalType": "struct IHybridHiveCore.GlobalTransfer",
        "name": "_globalTransferConfig",
        "type": "tuple"
      }
    ],
    "name": "addGlobalTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IHybridHiveCore.EntityType",
        "name": "_entityType",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_aggregatorId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_subEntity",
        "type": "uint256"
      }
    ],
    "name": "addSubEntity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "burnToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_aggregatorName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_aggregatorSymbol",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_aggregatorURI",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_aggregatorOperator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_parentAggregator",
        "type": "uint256"
      },
      {
        "internalType": "enum IHybridHiveCore.EntityType",
        "name": "_aggregatedEntityType",
        "type": "uint8"
      },
      {
        "internalType": "uint256[]",
        "name": "_aggregatedEntities",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_aggregatedEntitiesWeights",
        "type": "uint256[]"
      }
    ],
    "name": "createAggregator",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_tokenName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_tokenSymbol",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_tokenURI",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_tokenOperator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_parentAggregator",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "_tokenHolders",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_holderBalances",
        "type": "uint256[]"
      }
    ],
    "name": "createToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_aggregatorId",
        "type": "uint256"
      }
    ],
    "name": "getAggregatorParent",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_aggregatorId",
        "type": "uint256"
      }
    ],
    "name": "getAggregatorSubEntities",
    "outputs": [
      {
        "internalType": "enum IHybridHiveCore.EntityType",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IHybridHiveCore.EntityType",
        "name": "_entityType",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_entityId",
        "type": "uint256"
      }
    ],
    "name": "getEntityName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IHybridHiveCore.EntityType",
        "name": "_entityType",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_entityId",
        "type": "uint256"
      }
    ],
    "name": "getEntitySymbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IHybridHiveCore.EntityType",
        "name": "_entityType",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_entityId",
        "type": "uint256"
      }
    ],
    "name": "getEntityURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_networkRootAggregator",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_tokensAmount",
        "type": "uint256"
      }
    ],
    "name": "getGlobalTokenShare",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "getTokenBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_aggregatorId",
        "type": "uint256"
      }
    ],
    "name": "getTokenNumberInNetwork",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_aggregatorId",
        "type": "uint256"
      }
    ],
    "name": "getTokensInNetwork",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_globalTransferId",
        "type": "uint256"
      }
    ],
    "name": "globalTransferExecution",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "isAllowedTokenHolder",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "mintToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IHybridHiveCore.EntityType",
        "name": "_entityType",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_entityId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_parentAggregatorId",
        "type": "uint256"
      }
    ],
    "name": "updateParentAggregator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default ABI;
