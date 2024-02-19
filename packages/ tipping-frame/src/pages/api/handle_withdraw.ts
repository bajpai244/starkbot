// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next'
import { IMG_URL, NGROK_URL } from '@/constants';

import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { withdraw } from '../../../utils/withdraw';

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

    console.log("reaching here.");

  res.setHeader('Content-Type', 'text/html');

// make sure to set your NEYNAR_API_KEY .env
const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);
const validatedMessage = await client.validateFrameAction(req.body.trustedData.messageBytes);

const valid = validatedMessage.valid;
const userFid = validatedMessage.action?.interactor.fid;
const tapped_button = validatedMessage.action?.tapped_button.index;
const input = validatedMessage.action.input.text;

console.log('valid', valid);
console.log('user fid', userFid);
console.log('tapped button', tapped_button);
console.log('input', input);

if(valid) {
  withdraw(userFid, input);
  res.send(payment_success);
  }
}



const payment_success = `<!DOCTYPE html>
<html>
<head>
<title>Vote Recorded</title>
<meta property="og:title" content="Vote Recorded">
<meta name="fc:frame" content="vNext">
<meta name="fc:frame:image" content="${IMG_URL}">
<meta name="fc:frame:post_url" content="${NGROK_URL}/api/main">
<meta property="fc:frame:button:1" content="Withdraw is successful!" />
<meta property="fc:frame:button:2" content="back to home" />
</head>
<body>
</body>
</html>`
