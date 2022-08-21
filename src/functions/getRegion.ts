import { browser } from '$app/env';
import axios from 'axios';

const getRegion = async () => {
  try {
    const location = (await axios.get(`https://ipinfo.io/?token=${import.meta.env.VITE_IPINFO_TOKEN}`)).data;
    const enRegion = location.region;
    const storagedEnRegion = browser ? localStorage.enRegion : '';
    const region = browser ? localStorage.region : '';

    if (region === undefined || enRegion !== storagedEnRegion) {
      if (location.country === 'KR') {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${import.meta.env.VITE_GEOCODING_API}&address=${location.region}&language=ko`);
        const city = res.data.results[0].address_components[0].short_name;
        localStorage.region = city;
        localStorage.enRegion = enRegion;
        return city;
      }

      const city = 'Other Countries';
      localStorage.region = city;
      localStorage.enRegion = enRegion;
      return city;
    }

    return region;
  } catch (error) {
    throw error;
  }
}

export default getRegion;