import type { RequestHandler } from '@sveltejs/kit';
import https from 'https';
import axios from 'axios';
import replaceSpecials from 'src/functions/replaceSpecials';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { endWith, usedWords } = await request.json();
    const DICTAPI_TOKEN = import.meta.env.VITE_DICTAPI_TOKEN;
    const getNewWordReqURL = `https://opendict.korean.go.kr/api/search?key=${DICTAPI_TOKEN}&req_type=json&q=${encodeURI(endWith)}&sort=popular&advanced=y&method=start&type1=word`;
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    });
    const res = await axios.get(getNewWordReqURL, { httpsAgent });

    const items = res.data.channel.item;
    const item = items.filter((item: any) => {
      if (replaceSpecials(item.word).length > 1 && !usedWords.includes(replaceSpecials(item.word))) return item;
    });

    if (items.length === 0 || item.length === 0) {
      return {
        status: 200,
        body: {
          found: false,
          message: '당신이 이겼습니다! 1,000 포인트를 지급합니다!'
        }
      };
    }

    return {
      status: 200,
      body: {
        found: true,
        newWord: item[0].word,
        definition: item[0].sense[0].definition
      }
    };
  } catch (error) {
    throw error;
  }
}