import { api } from 'src/api';
import replaceSpecials from 'src/util/replaceSpecials';
import dueum from 'src/util/dueum';
import { usedWords, mine, myCounter } from 'src/store';
import { get } from 'svelte/store';
import addScore from 'src/functions/addScore';
import getRegion from 'src/functions/getRegion';

async function getNewWord(endWord: string, word: string, changeMessages: any, sendID: string) {
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

  if (word === '이리듐') {
    return {
      success: false,
      message: '금지된 한방단어입니다. ☠ - 이리듐'
    };
  }

  const { existWord, mean } = await api<'isExistWord'>('GET', `/api/isExistWord/${word}`);
  if (!existWord) {
    return {
      success: false,
      message: '사전에 존재하지 않는 단어입니다. 😥'
    };
  }

  changeMessages(false, sendID, word, mean);
  
  usedWords.update(usedWords => usedWords.concat(word));
  await addScore(word.length);
  mine.set({
    region: await getRegion(),
    scoreCount: get(mine).scoreCount + word.length
  });
  myCounter.set(get(myCounter) + word.length);

  let { found, newWord, definition, messages } = await api<'getNewWord'>('POST', `/api/getNewWord`, {
    endWith: word[word.length - 1],
    usedWords: get(usedWords)
  });
  if (found) {
    newWord = replaceSpecials(newWord as string);
    usedWords.update(usedWords => usedWords.concat(newWord as string));
    return {
      success: true,
      message: newWord,
      definition,
      mean
    };
  }

  return {
    end: true,
    messages,
    mean
  };
}

export default getNewWord;