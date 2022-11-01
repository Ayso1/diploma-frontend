import axios from 'axios';
import config from '../../config';
async function getCharity() {
  let res = await axios.get(`${config.apiUrl}/charity`);
}

export default getCharity;
