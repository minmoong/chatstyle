// async function getLeaderboardScore(fetch: Fetch) {
//   const res = await fetch('/api/getLeaderboardScore');
//   // console.log(res);
// }
import axios from 'axios';

async function getLeaderboardScore() {
  const res = await axios.get('/api/getLeaderboardScore');
  return res.data;
}

export default getLeaderboardScore;