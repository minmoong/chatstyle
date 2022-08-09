const getLocationInfo = async () => {
  const res = await fetch(`https://ipinfo.io/?token=${import.meta.env.VITE_IPINFO_TOKEN}`);


  if (res.ok) return await res.json();

  const { message } = await res.json();
  console.error(message);
}

export default getLocationInfo;