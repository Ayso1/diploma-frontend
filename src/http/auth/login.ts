import axios from 'axios';
import config from '../../config';
async function checkJWT(data) {
  console.log(data.token);
  let res = await axios.post(`${config.apiUrl}/user/welcome`, {
    token: data.token,

    headers: {
      'x-access-token': data.token,
    },
  });
}

export default checkJWT;
