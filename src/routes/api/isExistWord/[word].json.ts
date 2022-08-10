import type { RequestHandler } from '@sveltejs/kit';
import https from 'https';
import axios from 'axios';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const { word } = params;
    const DICTAPI_TOKEN = import.meta.env.VITE_DICTAPI_TOKEN;
    const wordExistReqURL = `https://opendict.korean.go.kr/api/search?key=${DICTAPI_TOKEN}&req_type=json&q=${encodeURI(word)}&advanced=y&method=exact`;
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    });
    const res = await axios.get(wordExistReqURL, { httpsAgent });
    if (res.data.channel.item.length > 0) {
      return {
        body: { existWord: true }
      };
    }

    return {
      body: { existWord: false }
    };
  } catch (error) {
    throw error;
  }
}