import axios from 'axios';

const getLocationInfo = async () => {
  const res = await fetch(`https://ipinfo.io/?token=${import.meta.env.VITE_IPINFO_TOKEN}`); // TODO: axios 혹은 svelte fetch 로 바꾸기
  
  if (res.ok) return await res.json();

  const { message } = await res.json();
  console.error(message);
}

export default getLocationInfo;