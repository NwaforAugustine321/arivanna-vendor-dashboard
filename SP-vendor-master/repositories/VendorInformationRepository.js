import Repository, {base_url, baseUrl} from "./Repository";

class VendorInformationRepository {
    async getVendorDetails() {
        const local = JSON.parse(localStorage.getItem("persist:Arivanna"));
        const {token} = JSON.parse(local.auth);
        const response = await Repository.post(`${base_url}vendor`, {token})
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({error: JSON.stringify(error)}));

        return response;
    }

    async updateVendorDetails(id_vendor, vendor) {
        const local = JSON.parse(localStorage.getItem("persist:Arivanna"));
        const auth_token = JSON.parse(local.auth).token;

        if (auth_token) {
           
            return await Repository.post(`${base_url}vendor_update`, {
                auth_token,
                ...vendor,
            })
                .then((response) => {
                    return response.data;
                })
                .catch((error) => ({error: JSON.stringify(error)}));
        }

        return Promise.reject("Error: token not found");
    }

    async updateVendorPassword(payload) {
        const response = await Repository.post(
            `${base_url}forgot_password`,
            payload
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({error: JSON.stringify(error)}));
        return response;
    }
}

export default new VendorInformationRepository();
