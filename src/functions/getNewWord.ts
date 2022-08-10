// https://opendict.korean.go.kr/api/search?key=FEB11DA38C9CD89ADF39487FB8CE68EA&req_type=json&q=%EB%82%98&advanced=y&type1=word&sort=popular&method=start

import { api } from 'src/api';

async function getNewWord(word: string) {
  const res = await api<'isExistWord'>('GET', `/api/isExistWord/${word}.json`);
  if (!res.existWord) {
    console.log('존재하지 않는 단어입니다.');
    return;
  }

  console.log('존재하는 단어입니다.');
}

export default getNewWord;