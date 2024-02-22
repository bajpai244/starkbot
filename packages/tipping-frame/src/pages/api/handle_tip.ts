// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next'
import { NGROK_URL, IMG_URL } from '@/constants';

import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { deposit } from '../../../utils/deposit';
import { tip } from '../../../utils/tip';

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

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

const recipient_fId = (await client.lookupUserByUsername(input)).result.user.fid;
console.log('recipient fid', recipient_fId);

if(valid) {
  let amount;
  switch (tapped_button) {
    case 1:
      amount = 10;
      break;
    case 2:
      amount = 100;
      break;
    case 3:
      amount = 1000;
      break;
    case 4:
      amount = 50000;
      break;
    default:
      break;
  }

  tip(userFid, recipient_fId, amount);
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
<meta property="fc:frame:button:1" content="Payment is successful!" />
<meta property="fc:frame:button:2" content="back to home" />
</head>
<body>
</body>
</html>`
