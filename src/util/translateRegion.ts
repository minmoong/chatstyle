import axios from 'axios';

async function translateRegion(region: string) {
  try {
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAZWWrPZB0Og8DNEi938o0lmbmTIUglgqQ&address=${region}&language=ko`);
    return res.data.results[0].address_components[0].short_name;
  } catch (error) {
    throw error;
  }
}

export default translateRegion;
