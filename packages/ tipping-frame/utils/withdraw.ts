import { RpcProvider } from "starknet";
import { getContract, getOwnerAccount } from "./utils";

export const withdraw = async (fId: number, address: string) => {
    const provider = new RpcProvider({ nodeUrl: process.env.RPC_URL });
    const account = getOwnerAccount(provider);
    let contract = getContract(account);

    const balance = await contract.get_balance(fId);
    console.log("balance is", balance);

    let call = contract.populate("withdraw", {
        fid: fId,
        address
    });

    const response = await contract.withdraw(call.calldata);
    console.log("withdraw response", response);
}
