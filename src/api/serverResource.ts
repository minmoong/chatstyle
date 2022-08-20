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
      found: boolean;
      newWord?: string;
      definition?: string;
      message?: string;
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
  };
  getLeaderboard: {
    method: 'GET';
    endpoint: string;
    req: {}
    res: {
      leaderboard: Leaderboard[]
    };
  }
}