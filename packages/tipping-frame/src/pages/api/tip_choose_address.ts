// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs"
import { IMG_URL, HTTPS_URL } from '../../../utils/constants';

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
 // Return an HTML response
 res.setHeader('Content-Type', 'text/html');

 res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
<title>Vote Recorded</title>
<meta property="og:title" content="Vote Recorded">
<meta name="fc:frame" content="vNext">
<meta name="fc:frame:image" content="${IMG_URL}">
<meta name="fc:frame:post_url" content="${HTTPS_URL}/api/handle_payload">
<meta name="fc:frame:input:text" content="Input farcaster Username"/>
<meta property="fc:frame:button:1" content="Confirm" />
</head>
<body>
</body>
</html>
`);
}
