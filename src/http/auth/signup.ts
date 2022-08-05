import axios from 'axios';
import config from '../../config';
async function doPostRequest(data) {
  let res = await axios.post(`${config.apiUrl}/user`, {
    email: data.email,
    password: data.password,
    isEmailVerified: true,
    firstName: data.firstName,
    lastName: data.lastName,
  });
}

export default doPostRequest;
