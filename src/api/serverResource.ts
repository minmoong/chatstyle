export interface APIResource {
  isExistWord: {
    method: 'GET';
    endpoint: string;
    req: {};
    res: {
      existWord: boolean;
      mean?: string;
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
      messages?: string[];
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
  registerRegion: {
    method: 'POST';
    endpoint: string;
    req: {
      region: string;
    };
    res: {};
  }
}