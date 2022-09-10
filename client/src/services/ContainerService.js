/** */
export default class ContainerService {
  /**
   * @return {Promise} Promise returned when the Container Service completes the request
   */
  getAll() {
    return fetch('http://localhost:5000/containers');
  }
}
