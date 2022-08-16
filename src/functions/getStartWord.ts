import { api } from 'src/api';
import replaceSpecials from './replaceSpecials';

async function a() {
  let { startWord, definition } = await api<'getStartWord'>('GET', '/api/getStartWord.json');
  startWord = replaceSpecials(startWord);
  return {
    startWord,
    definition
  }
}

export default a;