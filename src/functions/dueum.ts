let HANGUL_FIRST = '가',
	HANGUL_LAST = '힣',
	HANGUL_FIRST_CODE = HANGUL_FIRST.charCodeAt(0),
	HANGUL_LAST_CODE = HANGUL_LAST.charCodeAt(0);

let JONGSEONG = "Xㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ",
	JONGSEONG_LEN = JONGSEONG.length;

function dueum(s: string){
  if(!s) return '';
  var c = s.charCodeAt(0);
  if(c < HANGUL_FIRST_CODE || c > HANGUL_LAST_CODE) return s;
  switch(0|(c-HANGUL_FIRST_CODE)/JONGSEONG_LEN){
    // 녀, 뇨, 뉴, 니
    case 48: case 54:
    case 59: case 62:
      c += 5292; break;
    // 랴, 려, 례, 료, 류, 리
    case 107: case 111:
    case 112: case 117:
    case 122: case 125:
      c += 3528; break;
    // 라, 래, 로, 뢰, 루, 르
    case 105: case 106:
    case 113: case 116:
    case 118: case 123:
      c -= 1764; break;
  }
  return String.fromCharCode(c) + s.slice(1);
}

export default dueum;