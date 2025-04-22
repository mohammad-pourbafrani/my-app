import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { BrowserProvider, Contract, ethers, formatUnits, providers } from "ethers";

const USDTAddress = "0xf01a65f0ca8c3a9703cfab5b442956f1d6b9c515";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const USDTAbi = [
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

export function Components() {
    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider("eip155");

    async function getBalance() {
        if (!isConnected) throw Error("User disconnected");
        console.log("addresssssss :", address);
        console.log("providerrrrr:  ", walletProvider);
        const ethersProvider = new BrowserProvider(walletProvider);
        // const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
        console.log("ethers provider :", (await ethersProvider._detectNetwork()).chainId);

        // const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        // // The Contract object
        const contract = new ethers.Contract(USDTAddress, USDTAbi, signer);
        const getPlans = await contract.getPlans();
        const getStackList = await contract.getStakeList();

        console.log("planssss :", getPlans);
        console.log("stckeList :", getStackList);

    }

    return <button onClick={getBalance}>Get User Balance</button>;
}