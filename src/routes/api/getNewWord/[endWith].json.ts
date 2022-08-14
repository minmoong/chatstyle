// Changed

import type { RequestHandler } from '@sveltejs/kit';
import https from 'https';
import axios from 'axios';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const { endWith } = params;
    const DICTAPI_TOKEN = import.meta.env.VITE_DICTAPI_TOKEN;
    const getNewWordReqURL = `https://opendict.korean.go.kr/api/search?key=${DICTAPI_TOKEN}&req_type=json&q=${encodeURI(endWith)}&advanced=y&sort=popular&method=start`
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    });
    const res = await axios.get(getNewWordReqURL, { httpsAgent });
    return {
      status: 200,
      body: { newWord: res.data.channel.item[1].word }
    };
  } catch (error) {
    throw error;
  }
}