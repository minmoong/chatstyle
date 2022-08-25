import { api } from 'src/api';

async function getLeaderboard() {
  const { leaderboard } = await api<'getLeaderboard'>('GET', '/api/getLeaderboard');
  return leaderboard;
}

export default getLeaderboard;