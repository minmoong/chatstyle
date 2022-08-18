export interface APIResource {
  isExistWord: {
    method: 'GET';
    endpoint: string;
    req: {};
    res: {
      existWord: boolean;
    };
  };
  getNewWord: {
    method: 'POST';
    endpoint: string;
    req: {
      endWith: string;
      usedWords: string[];
    };
    res: {
      newWord: string;
      definition: string;
    };
  };
  getStartWord: {
    method: 'GET';
    endpoint: string;
    req: {};
    res: {
      startWord: string;
      definition: string;
    }
  };
  addScore: {
    method: 'POST';
    endpoint: string;
    req: {
      region: string;
      increasementScore: number;
    };
    res: {};
  }
}