import { bsc, mainnet } from "@reown/appkit/networks";
import { useAppKitNetwork } from "@reown/appkit/react";
import React from "react";



export function ChangeNetwork() {
    // 4. Use modal hook
    const { caipNetwork, caipNetworkId, chainId, switchNetwork } = useAppKitNetwork();
    console.log(chainId);
    
    return (
        <>
            <button onClick={() => switchNetwork(bsc)}>change network</button>
        </>
    );
}

