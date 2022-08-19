import { api } from 'src/api';

async function addScore(region: string, increasementScore: number) {
  const res = await api<'addScore'>('POST', '/api/addScore', { region, increasementScore });
  console.log(res);
}

export default addScore;