import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { BrowserProvider, Contract, ethers, formatUnits, providers } from "ethers";

const bsccontractAddress = "0xf01a65f0ca8c3a9703cfab5b442956f1d6b9c515";
const ethContractAddress = "0x83a0b85ff955ae9654B70DC192bB68D50831D738";


// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const bscContractAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "previousAdmin",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "newAdmin",
                "type": "address"
            }
        ],
        "name": "AdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "beacon",
                "type": "address"
            }
        ],
        "name": "BeaconUpgraded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "version",
                "type": "uint8"
            }
        ],
        "name": "Initialized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "previousAdminRole",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "newAdminRole",
                "type": "bytes32"
            }
        ],
        "name": "RoleAdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleGranted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleRevoked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "releaseDate",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "releaseDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ratio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmount",
                        "type": "uint256"
                    }
                ],
                "indexed": false,
                "internalType": "struct Staking.planInfo",
                "name": "pInfo",
                "type": "tuple"
            }
        ],
        "name": "Staked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "releaseDate",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "releaseDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ratio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmount",
                        "type": "uint256"
                    }
                ],
                "indexed": false,
                "internalType": "struct Staking.planInfo",
                "name": "pInfo",
                "type": "tuple"
            }
        ],
        "name": "UnStaked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "implementation",
                "type": "address"
            }
        ],
        "name": "Upgraded",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "HippoToken",
        "outputs": [
            {
                "internalType": "contract IERC20Upgradeable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "KEEPER_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_date",
                "type": "uint256"
            }
        ],
        "name": "adminUnStake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "dayStakeMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "stakeHolder",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "releaseDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ratio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Staking.planInfo",
                "name": "pInfo",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDaysStakeList",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "stakeHolder",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "releaseDuration",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "ratio",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "minAmount",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct Staking.planInfo",
                        "name": "pInfo",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct Staking.dayStakingInfo[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPlans",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "releaseDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ratio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Staking.planInfo[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            }
        ],
        "name": "getRoleAdmin",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getStakeList",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "releaseDate",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "releaseDuration",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "ratio",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "minAmount",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct Staking.planInfo",
                        "name": "pInfo",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct Staking.stakingInfo[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "hasRole",
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
                "internalType": "address",
                "name": "hippoAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "releaseDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ratio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Staking.planInfo[]",
                "name": "_pInfo",
                "type": "tuple[]"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "plans",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "releaseDuration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "ratio",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "proxiableUUID",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ratioOfTimeStamp",
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
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rewardPrecision",
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
                "internalType": "address",
                "name": "_HippoToken",
                "type": "address"
            }
        ],
        "name": "setHippoToken",
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
                        "name": "releaseDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ratio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Staking.planInfo[]",
                "name": "_pInfo",
                "type": "tuple[]"
            }
        ],
        "name": "setPlan",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_rewardPrecision",
                "type": "uint256"
            }
        ],
        "name": "setRewardPrecision",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "planIndex",
                "type": "uint256"
            }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "stakeMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "releaseDate",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "releaseDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ratio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Staking.planInfo",
                "name": "pInfo",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
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
        "inputs": [],
        "name": "unStake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            }
        ],
        "name": "upgradeTo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "upgradeToAndCall",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
];

const ethContractAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "previousAdmin",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "newAdmin",
                "type": "address"
            }
        ],
        "name": "AdminChanged",
        "type": "event",
        "signature": "0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "beacon",
                "type": "address"
            }
        ],
        "name": "BeaconUpgraded",
        "type": "event",
        "signature": "0x1cf3b03a6cf19fa2baba4df148e9dcabedea7f8a5c07840e207e5c089be95d3e"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "version",
                "type": "uint8"
            }
        ],
        "name": "Initialized",
        "type": "event",
        "signature": "0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "previousAdminRole",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "newAdminRole",
                "type": "bytes32"
            }
        ],
        "name": "RoleAdminChanged",
        "type": "event",
        "signature": "0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleGranted",
        "type": "event",
        "signature": "0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleRevoked",
        "type": "event",
        "signature": "0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "releaseDate",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "releaseDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ratio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmount",
                        "type": "uint256"
                    }
                ],
                "indexed": false,
                "internalType": "struct Staking.planInfo",
                "name": "pInfo",
                "type": "tuple"
            }
        ],
        "name": "Staked",
        "type": "event",
        "signature": "0x5fd6beb9aafde61df9ea23e568c82d9fdf91a3754c05a94e05513000f9f88a60"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "releaseDate",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "releaseDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ratio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmount",
                        "type": "uint256"
                    }
                ],
                "indexed": false,
                "internalType": "struct Staking.planInfo",
                "name": "pInfo",
                "type": "tuple"
            }
        ],
        "name": "UnStaked",
        "type": "event",
        "signature": "0xa4e3b1adc30eeceb9a87fb565083d6b967dd400e4735da47f8d844734ace1aac"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "implementation",
                "type": "address"
            }
        ],
        "name": "Upgraded",
        "type": "event",
        "signature": "0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b"
    },
    {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0xa217fddf"
    },
    {
        "inputs": [],
        "name": "HippoToken",
        "outputs": [
            {
                "internalType": "contract IERC20Upgradeable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x2238b5c9"
    },
    {
        "inputs": [],
        "name": "KEEPER_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x364bc15a"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_date",
                "type": "uint256"
            }
        ],
        "name": "adminUnStake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x6dc8c9f2"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "dayStakeMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "stakeHolder",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "releaseDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ratio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Staking.planInfo",
                "name": "pInfo",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x560059e4"
    },
    {
        "inputs": [],
        "name": "getDaysStakeList",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "stakeHolder",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "releaseDuration",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "ratio",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "minAmount",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct Staking.planInfo",
                        "name": "pInfo",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct Staking.dayStakingInfo[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x97a88156"
    },
    {
        "inputs": [],
        "name": "getPlans",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "releaseDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ratio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Staking.planInfo[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0xd94a862b"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            }
        ],
        "name": "getRoleAdmin",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x248a9ca3"
    },
    {
        "inputs": [],
        "name": "getStakeList",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "releaseDate",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "releaseDuration",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "ratio",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "minAmount",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct Staking.planInfo",
                        "name": "pInfo",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct Staking.stakingInfo[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x5e4f0a64"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x2f2ff15d"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "hasRole",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x91d14854"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "hippoAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "releaseDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ratio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Staking.planInfo[]",
                "name": "_pInfo",
                "type": "tuple[]"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x207e1f7e"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "plans",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "releaseDuration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "ratio",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0xb1620616"
    },
    {
        "inputs": [],
        "name": "proxiableUUID",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x52d1902d"
    },
    {
        "inputs": [],
        "name": "ratioOfTimeStamp",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0xd78b9de9"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x36568abe"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xd547741f"
    },
    {
        "inputs": [],
        "name": "rewardPrecision",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x5bae9619"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_HippoToken",
                "type": "address"
            }
        ],
        "name": "setHippoToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x3f55b41d"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "releaseDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ratio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Staking.planInfo[]",
                "name": "_pInfo",
                "type": "tuple[]"
            }
        ],
        "name": "setPlan",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x69faa68b"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_rewardPrecision",
                "type": "uint256"
            }
        ],
        "name": "setRewardPrecision",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x8663e5cc"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "planIndex",
                "type": "uint256"
            }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x7b0472f0"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "stakeMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "releaseDate",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "releaseDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ratio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Staking.planInfo",
                "name": "pInfo",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x3fa7c848"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x01ffc9a7"
    },
    {
        "inputs": [],
        "name": "unStake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x73cf575a"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            }
        ],
        "name": "upgradeTo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x3659cfe6"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "upgradeToAndCall",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true,
        "signature": "0x4f1ef286"
    }
];

export function Components() {
    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider("eip155");

    async function getPlansInfo() {
        if (!isConnected) throw Error("User disconnected");
        console.log("addresssssss :", address);
        console.log("providerrrrr:  ", walletProvider);
        const ethersProvider = new BrowserProvider(walletProvider);
        // const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
        console.log("chain id :", (await ethersProvider._detectNetwork()).chainId);

        // const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        // // The Contract object
        const contract = new ethers.Contract(bsccontractAddress, bscContractAbi, signer);
        const plans = await contract.getPlans();
        // const getStackList = await contract.getStakeList();

        console.log("planssss :", plans);
        // parseInt(getPlans[0][2], 10) / 10 ** 18;
        // parseInt(getPlans[0][0], 10) / 3600 /24;
        plans.forEach((plan, index) => {
            console.log(`Plan ${index + 1}:`);
            console.log(`Index: ${index}`);
            console.log(`Release Duration: ${parseInt(plan[0]) / 3600 / 24}`);
            console.log(`Ratio: ${parseInt(plan[1]) / 100}`);
            console.log(`Min Amount: ${parseInt(plan[2], 10) / Math.pow(10, 18)}`);
            console.log('---');
        });

        // console.log("stckeList :", getStackList);
        // getStackList.forEach((stake, index) => {
        //     console.log(`index ${index}`);
        //     console.log(`endTime ${Date(parseInt(stake[1])).toLocaleString()}`);
        //     console.log(`amount ${parseInt(stake[0], 10) / Math.pow(10, 18)}`);
        //     console.log('plan details :');
        //     console.log(`  Release Duration: ${parseInt(stake[2][0]) / 3600 / 24}`);
        //     console.log(`  Ratio: ${parseInt(stake[2][1]) / 100}`);
        //     console.log(`  Min Amount: ${parseInt(stake[2][2], 10) / Math.pow(10, 18)}`);
        //     console.log('--------------------');

        // });

    }

    return <button onClick={getPlansInfo}>get plans</button>;
}