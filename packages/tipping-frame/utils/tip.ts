import { RpcProvider, cairo } from "starknet";
import { getContract, getOwnerAccount } from "./utils";

export const tip = async (fromFid: number, toFid: number, amount: number) => {
    const provider = new RpcProvider({ nodeUrl: process.env.RPC_URL });
    const account = getOwnerAccount(provider);
    let contract = getContract(account);

    let call = contract.populate("tip", {
        from_fid: fromFid,
        to_fid: toFid,
        amount: cairo.uint256(amount)
    });

    const response = await contract.tip(call.calldata);
    console.log("deposit response", response);
}
