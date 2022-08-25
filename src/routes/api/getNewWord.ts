import type { RequestHandler } from '@sveltejs/kit';
import https from 'https';
import axios from 'axios';
import { replaceSpecials } from 'src/util';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { endWith, usedWords } = await request.json();
    const DICTAPI_TOKEN = import.meta.env.VITE_DICTAPI_TOKEN;
    const getNewWordReqURL = `https://opendict.korean.go.kr/api/search?key=${DICTAPI_TOKEN}&req_type=json&q=${encodeURI(endWith)}&sort=popular&advanced=y&method=start&type1=word`;
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    });
    const res = await axios.get(getNewWordReqURL, { httpsAgent });

    const items = res.data.channel.item.filter((item: any) => replaceSpecials(item.word).length > 1 && !usedWords.includes(replaceSpecials(item.word)));

    if (items.length === 0) {
      return {
        status: 200,
        body: {
          found: false,
          messages: ['🏳️ 항복하겠습니다! 🏳️', '1,000 포인트를 드립니다!']
        }
      };
    }

    const item = items[Math.floor(Math.random() * items.length)];

    return {
      status: 200,
      body: {
        found: true,
        newWord: item.word,
        definition: item.sense[0].definition
      }
    };
  } catch (error) {
    throw error;
  }
}