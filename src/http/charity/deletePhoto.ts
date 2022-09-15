import axios from 'axios';
import config from '../../config';
async function deletePhoto(file) {
  let res = await axios.delete(`${config.s3Url}/${file}`);
}
export default deletePhoto;
