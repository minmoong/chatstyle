import type { RequestHandler } from '@sveltejs/kit';
import https from 'https';
import axios from 'axios';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { word } = await request.json();
    const DICTAPI_TOKEN = import.meta.env.VITE_DICTAPI_TOKEN;
    const wordExistReqURL = `https://opendict.korean.go.kr/api/search?key=${DICTAPI_TOKEN}&req_type=json&q=${encodeURI(word)}&advanced=y&method=exact&type1=word`;
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    });
    const res = await axios.get(wordExistReqURL, { httpsAgent });
    const items = res.data.channel.item;
    if (items.length > 0) {
      return {
        status: 200,
        body: { existWord: true, mean: items[0].sense[0].definition }
      };
    }

    return {
      status: 200,
      body: { existWord: false }
    };
  } catch (error) {
    throw error;
  }
}