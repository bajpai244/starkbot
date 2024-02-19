import { startPolling } from "@big-whale-labs/botcaster";
import { CastWithInteractions } from "@neynar/nodejs-sdk/build/neynar-api/v1";

class PollingService {
    fId: number;
    neynarApiKey: string

    constructor (fId: number, neynarApiKey: string, handler: (notification: CastWithInteractions) => void) {
        this.fId = fId;
        this.neynarApiKey = neynarApiKey;
    }

    private startPolling() {
        startPolling(this.fId, this.neynarApiKey, );
    }

    start () {

    }
}
