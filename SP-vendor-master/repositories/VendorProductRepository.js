import Repository, { baseUrl, base_url, serializeQuery } from "./Repository";

class VendorProductRepository {

  async createProduct(product) {

    const local = JSON.parse(localStorage.getItem("persist:Arivanna"));
    const { id_vendor, token } = JSON.parse(local.auth);


    const result = await Repository.post(
      `${base_url}product-create`,
      { token, ...product }
    ).then((result) => {
      return result.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return result;
  }

  async deleteProduct(id_product_m2m_vendor) {

    const local = JSON.parse(localStorage.getItem("persist:Arivanna"));
    const { token } = JSON.parse(local.auth);


    const result = await Repository.post(
      `${base_url}product_delete`,
      { token, id_product_m2m_vendor }
    ).then((result) => {
      return result.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return result;
  }

}

export default new VendorProductRepository();
