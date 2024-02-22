import { Account, Contract, RpcProvider } from "starknet";
import fs from "fs";
import { ENV, TIP_ADDRESS } from './constants'
import path from "path";

export const getOwnerAccount = (provider: RpcProvider) => {
    const privateKey = process.env.PRIVATE_KEY;
    const accountAddress = process.env.ACCOUNT_ADDRESS;

    const account = new Account(provider, accountAddress, privateKey);
    return account;
}

export const getSenderAccount = (provider: RpcProvider) => {
    const privateKey = process.env.PRIVATE_KEY_SENDER;
    const accountAddress = process.env.ACCOUNT_ADDRESS_SENDER;

    const account = new Account(provider, accountAddress, privateKey);
    return account;
}

export const getContract = (account: Account) => {
    const sierra = getSierra();
    const contract = new Contract(sierra.abi, TIP_ADDRESS, account);
    return contract;
}

export const getSierra = () => {
    const compiledTestSierra = JSON.parse(fs.readFileSync(path.join(ENV.CONTRACT_BUILD_PATH, "tipping_Tip.contract_class.json")).toString("ascii"));
    return compiledTestSierra
}

export const getCasm = () => {
    const casm = JSON.parse(fs.readFileSync(path.join(ENV.CONTRACT_BUILD_PATH, "./build/tipping_Tip.compiled_contract_class.json")).toString("ascii"));
    return casm
}

export const validateAndReturnEnv = () => {

    const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;
    if (NEYNAR_API_KEY === undefined) {
        throw new Error("NEYNAR_API_KEY is not set in the environment");
    }

    const RPC_URL = process.env.RPC_URL;
    if (RPC_URL === undefined) {
        throw new Error("RPC_URL is not set in the environment");
    }

    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    if (PRIVATE_KEY === undefined) {
        throw new Error("PRIVATE_KEY is not set in the environment");

    }

    const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS;
    if (ACCOUNT_ADDRESS === undefined) {
        throw new Error("ACCOUNT_ADDRESS is not set in the environment");
    }

    const PRIVATE_KEY_SENDER = process.env.PRIVATE_KEY_SENDER;
    if (PRIVATE_KEY_SENDER === undefined) {
        throw new Error("PRIVATE_KEY_SENDER is not set in the environment");

    }

    const ACCOUNT_ADDRESS_SENDER = process.env.ACCOUNT_ADDRESS_SENDER;
    if (ACCOUNT_ADDRESS_SENDER === undefined) {
        throw new Error("ACCOUNT_ADDRESS_SENDER is not set in the environment");
    }

    const CONTRACT_BUILD_PATH = process.env.CONTRACT_BUILD_PATH;
    if (CONTRACT_BUILD_PATH === undefined) {
        throw new Error("CONTRACT_BUILD_PATH is not set in the environment");
    }

    return {
        NEYNAR_API_KEY,
        RPC_URL,
        PRIVATE_KEY,
        ACCOUNT_ADDRESS,
        PRIVATE_KEY_SENDER,
        ACCOUNT_ADDRESS_SENDER,
        CONTRACT_BUILD_PATH
    }
}
