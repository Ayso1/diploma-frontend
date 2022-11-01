import axios from 'axios';
import config from '../../config';
async function doPost(data) {
  let res = await axios.post(`${config.apiUrl}/charity`, {
    title: data.title,
    descriptions: data.description,
    photos: data.photos,
    userId: 1,
    categorieId: data.categorieId,
  });
}

export default doPost;
