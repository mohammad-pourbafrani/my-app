import { useAppKit } from "@reown/appkit/react";
import { Components } from "./call_api_func.js";
import { StakeButton } from "./stake_button.js";
import { ChangeNetwork } from "./change_network.tsx";
export function ConnectButton() {
    // 4. Use modal hook
    const { open } = useAppKit();
    return (
        <>
            <button onClick={() => open()}>Open Connect Modal</button>
            <button onClick={() => open({ view: "Networks" })}>
                Open Network Modal
            </button>


            <Components />

            <StakeButton/>
            <ChangeNetwork/>

        </>
    );
}