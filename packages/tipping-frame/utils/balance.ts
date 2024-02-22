import { RpcProvider } from "starknet";
import { getContract, getOwnerAccount } from "./utils";

export const getBalance = async (fId: number) => {
    const provider = new RpcProvider({ nodeUrl: process.env.RPC_URL });
    const account = getOwnerAccount(provider);
    let contract = getContract(account);

    const balance = await contract.get_balance(fId);
    return balance;
}
