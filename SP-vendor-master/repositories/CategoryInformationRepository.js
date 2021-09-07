import Repository, { baseUrl, base_url, serializeQuery } from "./Repository";

class CategoriesInformationRepository {
  async getAllCategories() {
    // const local = JSON.parse(localStorage.getItem("persist:Arivanna"));
    // const { token } = JSON.parse(local.auth);

    const response = await Repository.get(
    `${base_url}product_categories`,
    // { token }
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async getProductCategories() {
    const reponse = await Repository.get(`${base_url}product_categories`)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
}
}

export default new CategoriesInformationRepository();
