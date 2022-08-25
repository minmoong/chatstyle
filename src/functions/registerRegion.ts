import { api } from 'src/api';
import { getRegion } from 'src/functions';

async function registerRegion() {
  const region = await getRegion();
  await api<'registerRegion'>('POST', '/api/registerRegion', { region });
}

export default registerRegion;