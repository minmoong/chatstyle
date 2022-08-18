import { browser } from '$app/env';
import axios from 'axios';

const getRegion = async () => {
  try {
    const region = browser ? localStorage.region : '';
    if (region === undefined) {
      const location = (await axios.get(`https://ipinfo.io/?token=${import.meta.env.VITE_IPINFO_TOKEN}`)).data;
  
      if (location.country === 'KR') {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${import.meta.env.VITE_GEOCODING_API}&address=${location.city}&language=ko`);
        const city = res.data.results[0].address_components[0].short_name;
        localStorage.setItem('region', city);
        return city;
      }

      const city = '다른 나라';
      localStorage.setItem('region', city);
      return city;
    }

    return region;
  } catch (error) {
    throw error;
  }
}

export default getRegion;