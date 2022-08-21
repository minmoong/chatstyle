function replaceSpecials(word: string) {
  word = word.replaceAll(/\^/g, ' ');
  word = word.replaceAll(/\-/g, '');
  return word;
}

export default replaceSpecials;