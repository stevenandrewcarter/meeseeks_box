/** */
export default class ContainerService {
  /**
   * @return {Promise} Promise returned when the Container Service completes the request
   */
  async getAll() {
    const response = await fetch('/api/containers');
    if (response.ok) {
      return await response.json();
    }
    throw new Error(await response.json());
  }
}
