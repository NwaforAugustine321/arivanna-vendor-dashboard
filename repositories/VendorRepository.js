import Repository, { base_url, serializeQuery } from './Repository';

class VendorRepository {
    async getVendorById(payload) {
        const reponse = await Repository.get(`${base_url}vendor_public_details/${payload.id_vendor}`)
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new VendorRepository();
