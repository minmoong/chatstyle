import axios from 'axios';

const getLocationInfo = async () => {
  try {
    const res = await axios.get(`https://ipinfo.io/?token=${import.meta.env.VITE_IPINFO_TOKEN}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default getLocationInfo;