import axios from 'axios';
import config from '../../config';
async function sendEmail(postData, userData) {
  let res = await axios.post(`${config.apiUrl}/user/email`, {
    email: userData.email,
    title: postData.title,
  });
}

export default sendEmail;
