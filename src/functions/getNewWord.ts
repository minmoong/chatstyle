import { api } from 'src/api';

async function getNewWord(word: string) {
  const { existWord } = await api<'isExistWord'>('GET', `/api/isExistWord/${word}.json`);
  if (!existWord) return '존재하지 않는 단어입니다.';

  const { newWord } = await api<'getNewWord'>('GET', `/api/getNewWord/${word[word.length - 1]}.json`);
  return newWord;
}

export default getNewWord;