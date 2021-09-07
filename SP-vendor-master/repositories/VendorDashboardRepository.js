import Repository, { baseUrl, base_url, serializeQuery } from "./Repository";
class VendorDashboardRepository {
  async getRecentOrders() {
    const local = JSON.parse(localStorage.getItem("persist:Arivanna"));
    const token = JSON.parse(local.auth).token;

    if (token) {
      return await Repository.post(`${base_url}vendor_orders_get`, { token })
        .then((response) => {
          return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    }

    return Promise.reject("Error: token not found");
  }
  async getOrderDetails(id_order) {
    const local = JSON.parse(localStorage.getItem("persist:Arivanna"));
    const token = JSON.parse(local.auth).token;
    if (token) {
      return await Repository.post(`${base_url}vendor_single_order_get`, {
        token,
        id_order,
      })
        .then((response) => {
          // console.log("vendor_single_order_get:", response.data);
          // console.log("vendor_single_order_get:", response.data.data[0]);
          return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    }
    return Promise.reject("Error: token not found");
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

export default new VendorDashboardRepository();
