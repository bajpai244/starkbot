import { NeynarAPIClient, isApiErrorResponse } from "@neynar/nodejs-sdk";

export class FarcasterClient {
    client: NeynarAPIClient;
    signerUUID: string;

    constructor(NEYNAR_API_KEY: string, SIGNER_UUID: string) {
        this.client = new NeynarAPIClient(NEYNAR_API_KEY);
        this.signerUUID = SIGNER_UUID;
    }

    async publishCast(msg: string) {
        try {
            const response = await this.client.publishCast(this.signerUUID, msg);
            console.log("Published cast: ", response);
        }
        catch (err) {
            console.log("error:")

            // Error handling, checking if it's an API response error.
            if (isApiErrorResponse(err)) {
                console.log(err.response.data);
            } else {
                console.log(err);
            }
        }
    }

    async getCast(hash: string) {
        return await this.client.lookUpCastByHash(hash);
    }
}
