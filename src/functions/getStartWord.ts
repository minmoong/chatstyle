import { api } from 'src/api';
import replaceSpecials from './replaceSpecials';

async function getStartWord() {
  let { startWord, definition } = await api<'getStartWord'>('GET', '/api/getStartWord');
  startWord = replaceSpecials(startWord);
  return {
    startWord,
    definition
  }
}

export default getStartWord;