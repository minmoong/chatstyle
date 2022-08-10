export interface APIResource {
  isExistWord: {
    method: 'GET';
    endpoint: string;
    req: {};
    res: {
      existWord: boolean;
    };
  }
}