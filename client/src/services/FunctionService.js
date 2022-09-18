/** */
export default class FunctionService {
  /**
   * @return {Promise} Promise returned when the Function Service completes the request
   */
  async getAll() {
    const response = await fetch('http://localhost:5000/api/functions');
    return await response.json();
  }

  /**
   *
   * @param {Object} newFunction
   */
  async create(newFunction) {
    const response = await fetch('http://localhost:5000/api/functions', {
      method: 'POST',
      body: JSON.stringify(newFunction),
      headers: {'Content-Type': 'application/json'},
    });
    return await response.json();
  }
}
