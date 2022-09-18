/** */
export default class ImageService {
  /**
   * @return {Promise} Promise returned when the Images Service completes the request
   */
  async getAll() {
    const response = await fetch('http://localhost:5000/api/images');
    return await response.json();
  }
}
