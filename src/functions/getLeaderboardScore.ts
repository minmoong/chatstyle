async function getLeaderboardScore(fetch: Fetch) {
  const res = await fetch('/api/getLeaderboardScore');
  // console.log(res);
}

export default getLeaderboardScore;