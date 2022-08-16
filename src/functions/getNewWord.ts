import { api } from 'src/api';
import replaceSpecials from './replaceSpecials';
import dueum from 'src/functions/dueum';
import { usedWords } from 'src/store';
import { get } from 'svelte/store';

async function getNewWord(endWord: string, word: string) {
  if (word[0] !== endWord[endWord.length - 1] && word[0] !== dueum(endWord[endWord.length - 1])) {
    return {
      success: false,
      message: '끝말을 이어주세요. 🥱'
    };
  }

  if (word.length === 1) {
    return {
      success: false,
      message: '한 글자의 단어는 허용되지 않습니다. 😅'
    };
  }

  if (get(usedWords).includes(word)) {
    return {
      success: false,
      message: '중복된 단어입니다. 😊'
    };
  }
  usedWords.update(usedWords => usedWords.concat(word));

  const { existWord } = await api<'isExistWord'>('GET', `/api/isExistWord/${word}.json`);
  if (!existWord) {
    return {
      success: false,
      message: '존재하지 않는 단어입니다. 😥'
    };
  }

  let { newWord, definition } = await api<'getNewWord'>('POST', `/api/getNewWord.json`, {
    endWith: word[word.length - 1],
    usedWords: get(usedWords)
  });
  newWord = replaceSpecials(newWord);
  usedWords.update(usedWords => usedWords.concat(newWord));
  return {
    success: true,
    message: newWord,
    definition
  };
}

export default getNewWord;