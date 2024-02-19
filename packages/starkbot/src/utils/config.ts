import {config} from "dotenv"

export const parseConfig = () => {
    config();

    const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;
    if (!NEYNAR_API_KEY) {
        throw new Error("NEYNAR_API_KEY is not set");
    }

    const SIGNER_UUID = process.env.SIGNER_UUID;
    if (!SIGNER_UUID) {
        throw new Error("SIGNER_UUID is not set");
    }

    const DB_PATH = process.env.DB_PATH;
    if (!DB_PATH) {
        throw new Error("DB_PATH is not set");
    }

    const STARKBOT_FID_TMP = process.env.STARKBOT_FID;
    if (!STARKBOT_FID_TMP) {
        throw new Error("STARKBOT_FID is not set");
    }
    const STARKBOT_FID = parseInt(STARKBOT_FID_TMP);

    const SERVER_PORT_TMP = process.env.SERVER_PORT;
    if (!SERVER_PORT_TMP) {
        throw new Error("SERVER_PORT is not set");
    }
    const SERVER_PORT = parseInt(SERVER_PORT_TMP);

    return {
        NEYNAR_API_KEY,
        SIGNER_UUID,
        STARKBOT_FID,
        SERVER_PORT, DB_PATH
    };
}
