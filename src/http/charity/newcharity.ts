import axios from 'axios';
import config from '../../config';
async function doPost(data) {
  let res = await axios.post(`${config.apiUrl}/charity`, {
    title: data.title,
    descriptions: data.descriptions,
    photos: data.photo,
    userId: 1,
    categorieId: 1,
  });
}

export default doPost;
