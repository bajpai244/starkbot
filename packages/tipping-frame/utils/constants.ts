if (process.env.HTTPS_URL === undefined) {
    throw new Error("HTTPS_URL is not set in the environment");
}
export const HTTPS_URL = process.env.HTTPS_URL;

if (process.env.TIP_CLASS_HASH === undefined) {
    throw new Error("TIP_CLASS_HASH is not set in the environment");
}
export const TIP_CLASS_HASH = process.env.TIP_CLASS_HASH;

if (process.env.TIP_CONTRACT_ADDRESS === undefined) {
    throw new Error("TIP_CONTRACT_ADDRESS is not set in the environment");
}
export const TIP_CONTRACT_ADDRESS = process.env.TIP_CONTRACT_ADDRESS;

if (process.env.ETH_CONTRACT_ADDRESS === undefined) {
    throw new Error("ETH_CONTRACT_ADDRESS is not set in the environment");
}
export const ETH_CONTRACT_ADDRESS = process.env.ETH_CONTRACT_ADDRESS;

if (process.env.USDC_CONTRACT_ADDRESS === undefined) {
    throw new Error("USDC_CONTRACT_ADDRESS is not set in the environment");
}
export const USDC_CONTRACT_ADDRESS = process.env.USDC_CONTRACT_ADDRESS;

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

export const IMG_URL = `https://pbs.twimg.com/profile_banners/1580859458334375936/1684245497/1500x500`
