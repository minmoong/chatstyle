import { api } from 'src/api';
import { mine } from 'src/store';
import { get } from 'svelte/store';

async function addScore(increasementScore: number) {
  await api<'addScore'>('POST', '/api/addScore', { region: get(mine).region, increasementScore });
}

export default addScore;