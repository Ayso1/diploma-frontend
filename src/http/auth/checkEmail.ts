import axios from 'axios';
import config from '../../config';
async function doGetByEmail(data) {
  let res = await axios.get(`${config.apiUrl}/user?filterByEmail${data.email}`, {
  });
}

export default doGetByEmail;
