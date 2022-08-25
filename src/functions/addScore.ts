import { api } from 'src/api';
import { mine } from 'src/store';
import { get } from 'svelte/store';

async function addScore(increasement: number) {
  await api<'addScore'>('POST', '/api/addScore', { region: get(mine).region, increasement });
}

export default addScore;