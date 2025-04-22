import { useAppKit } from "@reown/appkit/react";
import { Components } from "./call_api_func.js";

export function ConnectButton() {
    // 4. Use modal hook
    const { open } = useAppKit();
    return (
        <>
            <button onClick={() => open()}>Open Connect Modal</button>
            <button onClick={() => open({ arguments: "Networks" })}>
                Open Network Modal
            </button>


            <Components />

        </>
    );
}