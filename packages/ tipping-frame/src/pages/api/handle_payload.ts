// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs"

import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { NGROK_URL, IMG_URL } from '@/constants';
import { getBalance } from '../../../utils/balance';

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  console.log("heyyyyyyyy");

  res.setHeader('Content-Type', 'text/html');

// make sure to set your NEYNAR_API_KEY .env
const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);
const validatedMessage = await client.validateFrameAction(req.body.trustedData.messageBytes);


console.log('validatedMessage', validatedMessage);

const valid = validatedMessage.valid;
const userFid = validatedMessage.action?.interactor.fid;
const tapped_button = validatedMessage.action?.tapped_button.index;
const input = validatedMessage.action.input.text;

console.log('valid', valid);
console.log('user fid', userFid);
console.log('tapped button', tapped_button);
console.log('input', input);

console.log('validated message', validatedMessage);

// user wants to tip
if (tapped_button == 2) {
  res.status(200).send(tip_choose_address);
}
else if (tapped_button == 3) {
  const balance = await getBalance(userFid);
  res.status(200).send(showBalance(balance));
}
else if (tapped_button == 4) {
  res.status(200).send(withdraw_screen);
}}


const tip_choose_address = `<!DOCTYPE html>
<html>
<head>
<title>Vote Recorded</title>
<meta property="og:title" content="Vote Recorded">
<meta name="fc:frame" content="vNext">
<meta name="fc:frame:image" content="${IMG_URL}">
<meta name="fc:frame:post_url" content="${NGROK_URL}/api/handle_tip">
<meta name="fc:frame:input:text" content="Input farcaster Username"/>
<meta property="fc:frame:button:1" content="10 wei" />
<meta property="fc:frame:button:2" content="100 wei" />
<meta property="fc:frame:button:3" content="1000 wei" />
<meta property="fc:frame:button:4" content="50000 wei" />
</head>
<body>
</body>
</html>`

const withdraw_screen = `<!DOCTYPE html>
<html>
<head>
<title>Vote Recorded</title>
<meta property="og:title" content="Vote Recorded">
<meta name="fc:frame" content="vNext">
<meta name="fc:frame:image" content="${IMG_URL}">
<meta name="fc:frame:post_url" content="${NGROK_URL}/api/handle_withdraw">
<meta name="fc:frame:input:text" content="Input Starknet Address"/>
<meta property="fc:frame:button:1" content="withdraw" />
</head>
<body>
</body>
</html>`;


const showBalance = (balance: number) => {
 return `
 <meta property="og:title" content="Vote Recorded">
<meta name="fc:frame" content="vNext">
<meta name="fc:frame:image" content="${IMG_URL}">
<meta name="fc:frame:post_url" content="${NGROK_URL}/api/main">
<meta property="fc:frame:button:1" content="your balance is ${balance}" />
<meta property="fc:frame:button:2" content="back to home" />`
}
