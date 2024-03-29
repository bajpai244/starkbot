import { startPolling } from "@big-whale-labs/botcaster";
import { FarcasterClient } from ".";
import { CastNotificationType, CastWithInteractions } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { Level } from "level"
import { db } from "../utils";
import path from "path";

export class StarkBot {
    farcasterClient: FarcasterClient;
    starkBotFid: number;
    neynarApiKey: string;
    levelsDB: Level<string, string>

    constructor(arg: {
        NEYNAR_API_KEY: string,
        SIGNER_UUID: string,
        STARKBOT_FID: number,
        DB_PATH: string
    }) {
        const { NEYNAR_API_KEY, SIGNER_UUID, STARKBOT_FID, DB_PATH } = arg;
        this.farcasterClient = new FarcasterClient(NEYNAR_API_KEY, SIGNER_UUID);
        this.starkBotFid = STARKBOT_FID;
        this.neynarApiKey = NEYNAR_API_KEY;

        const dbPath = path.join(process.cwd(), DB_PATH);
        this.levelsDB = new Level(dbPath);
    }

    private async handleNotification(notification: CastWithInteractions) {

        const notificationHash = notification.hash;

        if(await db.keyExists(this.levelsDB, notificationHash)){
            return;
        }
        else {
            console.log("the notification hasn't been handled yet");

            if(notification.type) {
                if(notification.type === CastNotificationType.Mention) {
                    console.log("this is a mention");

                    this.farcasterClient.publishFrame("https://fc-polls.vercel.app/polls/0dc157e8-9258-4ead-91d2-fe0eb4059190", notificationHash);
                }
            }

            // TODO: Here we should set the notification as handled
            this.levelsDB.put(notificationHash, "handled");
        }
    }

    async start() {
        await this.levelsDB.open();
        startPolling(this.starkBotFid, this.neynarApiKey, this.handleNotification.bind(this));
    }

    async stop () {
        await this.levelsDB.close();
    }
}
