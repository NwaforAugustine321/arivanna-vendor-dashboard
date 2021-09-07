import Repository, { base_url } from "./Repository";

class VendorOrderRepository {
  async getAllOrders() {
    try {
      const local = JSON.parse(localStorage.getItem("persist:Arivanna"));
      const { token } = JSON.parse(local.auth);

      if (token) {
        const response = await Repository.post(`${base_url}vendor_orders_get`, {
          token,
        });

        return response.data;
      }
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  }

  async updateOrder(payload) {
    const local = JSON.parse(localStorage.getItem("persist:Arivanna"));
    const token = JSON.parse(local.auth).token;

    payload.token = token;

    const response = await Repository.post(`${base_url}order_update`, payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }
}

export default new VendorOrderRepository();
