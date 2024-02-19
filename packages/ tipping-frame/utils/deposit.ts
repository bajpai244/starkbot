import { RpcProvider, cairo } from "starknet";
import { getContract, getSenderAccount } from "./utils";

export const deposit = async (fId: number, amount: number) => {
    const provider = new RpcProvider({ nodeUrl: process.env.RPC_URL });
    const account = getSenderAccount(provider);
    let contract = getContract(account);

    const balance = await contract.get_balance(fId);
    console.log("balance is", balance);

    let call = contract.populate("deposit", {
        fid: fId,
        amount: cairo.uint256(amount)
    });

    const response = await contract.deposit(call.calldata);
    console.log("deposit response", response);
  }
