/** */
export default class FunctionService {
  /**
   * @return {Promise} Promise returned when the Function Service completes the request
   */
  getAll() {
    return fetch('http://localhost:5000/functions');
  }
}
