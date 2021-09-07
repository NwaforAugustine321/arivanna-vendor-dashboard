import Repository, { baseUrl, base_url, serializeQuery } from "./Repository";

class ProductInformationRepository {
  async getProductDetails() {
    const local = JSON.parse(localStorage.getItem("persist:Arivanna"));
    const { id_vendor, token } = JSON.parse(local.auth);

    if (id_vendor && token) {
      const response = await Repository.get(
        `${base_url}vendor/${id_vendor}/products`,
        { token }
      )
        .then((response) => {
          return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
      return response;
    }
  }
}

export default new ProductInformationRepository();
