export const TIP_CLASS_HASH = "0x155605fd9474736cec781524ed144b3c354aa29384d7ece595f1a55c2f4bceb"
export const TIP_ADDRESS = "0x1b4a2420aa1fecc9025d8ab13ca32d337339c45b7d7fbb3e2497e46a5c49868"
export const ETH_ADDRESS = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

if (process.env.NEYNAR_API_KEY === undefined) {
    throw new Error("NEYNAR_API_KEY is not set in the environment");
}
export const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;

if (process.env.RPC_URL === undefined) {
    throw new Error("RPC_URL is not set in the environment");
}
export const RPC_URL = process.env.RPC_URL;

if (process.env.PRIVATE_KEY === undefined) {
    throw new Error("PRIVATE_KEY is not set in the environment");
}
export const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (process.env.ACCOUNT_ADDRESS === undefined) {
    throw new Error("ACCOUNT_ADDRESS is not set in the environment");
}
export const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS;

if (process.env.PRIVATE_KEY_SENDER === undefined) {
    throw new Error("PRIVATE_KEY_SENDER is not set in the environment");
}
export const PRIVATE_KEY_SENDER = process.env.PRIVATE_KEY_SENDER;

if (process.env.ACCOUNT_ADDRESS_SENDER === undefined) {
    throw new Error("ACCOUNT_ADDRESS_SENDER is not set in the environment");
}
export const ACCOUNT_ADDRESS_SENDER = process.env.ACCOUNT_ADDRESS_SENDER;

if (process.env.CONTRACT_BUILD_PATH === undefined) {
    throw new Error("CONTRACT_BUILD_PATH is not set in the environment");
}
export const CONTRACT_BUILD_PATH = process.env.CONTRACT_BUILD_PATH;
