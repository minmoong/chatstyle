import type { RequestHandler } from '@sveltejs/kit';
import https from 'https';
import axios from 'axios';
import replaceSpecials from 'src/functions/replaceSpecials';

export const GET: RequestHandler = async () => {
  try {
    const startWord = `가강건경고관광구규근기길나남노누다단달담대덕도동두라래로루리마만명무문미민바박백범별병보사산상새서석선설섭성세소솔수숙순숭슬승시신아안애엄여연영예오옥완요용우원월위유윤율으은의이익인일자잔장재전정제조종주준중지진찬창채천철초춘충치탐태택판하한해혁현형혜호홍화환회효훈휘희운모배부림봉혼황량린을비솜공면탁온디항후려균묵송욱휴언들견추걸삼열웅분${''/*'변'*/}양출타흥겸곤번식란더손술반빈실직악람권복심헌엽학개평늘랑향울련`;
    const startRandomWord = startWord[Math.floor(Math.random() * startWord.length)];
    const DICTAPI_TOKEN = import.meta.env.VITE_DICTAPI_TOKEN;
    const getStartWordReqURL = `https://opendict.korean.go.kr/api/search?key=${DICTAPI_TOKEN}&req_type=json&q=${encodeURI(startRandomWord)}&advanced=y&sort=popular&method=start&type1=word`;
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    });
    const res = await axios.get(getStartWordReqURL, { httpsAgent });

    const items = res.data.channel.item;
    const item = items.filter((item: any) => {
      if (replaceSpecials(item.word).length > 1) return item;
    });

    return {
      status: 200,
      body: {
        startWord: item[0].word,
        definition: item[0].sense[0].definition
      }
    };
  } catch (error) {
    throw error;
  }
}