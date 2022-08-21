import { api } from 'src/api';

async function getLeaderboard() {
  const leaderboard = await api<'getLeaderboard'>('GET', '/api/getLeaderboard');
  return leaderboard.leaderboard;
}

export default getLeaderboard;