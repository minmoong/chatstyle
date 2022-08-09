const getLocationInfo = async ({ fetch }: { fetch(info: RequestInfo, init?: RequestInit): Promise<Response> }) => {
  const res = await fetch(`https://ipinfo.io/?token=${import.meta.env.VITE_IPINFO_TOKEN}`);

  if (res.ok) return res.json();

  const { message } = await res.json();
  console.error(message);
}

 

export default getLocationInfo;