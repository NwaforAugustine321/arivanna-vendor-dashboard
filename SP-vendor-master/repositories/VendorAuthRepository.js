import Repository, { baseUrl, base_url, serializeQuery } from "./Repository";
class VendorAuthRepository {
  async logout() {
    const local = JSON.parse(localStorage.getItem("persist:Arivanna"));
    const token = JSON.parse(local.auth).token;

    if (token) {
      return await Repository.post(`${base_url}user_logout`, { token })
        .then((response) => {
          return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    }

    return Promise.reject("Error: token not found");
  }

}

export default new VendorAuthRepository();
