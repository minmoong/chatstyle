import { api } from 'src/api';

async function addScore(region: string, increasementScore: number) {
  api<'addScore'>('POST', '/api/addScore', { region, increasementScore });
}

export default addScore;