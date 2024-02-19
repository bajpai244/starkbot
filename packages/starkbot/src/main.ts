import { config, db } from "./utils"
import {FarcasterClient, StarkBot} from "./lib"
import path from "path";

const main = async () => {

    const { NEYNAR_API_KEY, SIGNER_UUID, STARKBOT_FID, DB_PATH} = config.parseConfig();

    const starkBot = new StarkBot({NEYNAR_API_KEY, SIGNER_UUID, STARKBOT_FID, DB_PATH});
    await starkBot.start();

    // let starkbotServer = new StarkBotServer(SERVER_PORT);
    // starkbotServer.start();

    // TODO: remove
    // const response = await neynarClient.publishCast("Hello Starknet");
    // const response  =   await neynarClient.getCast("0x542f2179cd69f1e9a6722a3b014bf071187ba740");
    // console.log("cast is ", response);
}

main()
