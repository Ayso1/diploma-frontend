import axios from 'axios';
import config from '../../config';
async function doPost(data, id) {
  let res = await axios.post(`${config.apiUrl}/charity`, {
    title: data.title,
    descriptions: data.description,
    photos: data.photos,
    contacts: data.contacts,
    userId: id,
    categorieId: data.categorieId,
  });
}

export default doPost;
