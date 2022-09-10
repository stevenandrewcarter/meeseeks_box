/** */
export default class ImageService {
  /**
   * @return {Promise} Promise returned when the Images Service completes the request
   */
  getAll() {
    return fetch('http://localhost:5000/images');
  }
}
