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
    method: 'GET';
    endpoint: string;
    req: {};
    res: {
      newWord: string;
    };
  }
}