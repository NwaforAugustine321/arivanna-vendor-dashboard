import Repository, { base_url, serializeQuery } from './Repository';

class StoreRepository {
    constructor(callback) {
        this.callback = callback;
    }





    async get_single_store(id_vendor) {
        const reponse = await Repository.get(`${base_url}vendor_public_details/${id_vendor}`)
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => {
                return null;
            });
        return reponse;
    }


    async getStores() {
        // const endPoint = `stores?${serializeQuery(payload)}`;
        const reponse = await Repository.get(`${base_url}vendors`)
            .then((response) => {
                if (response.data.data.vendors.length > 0) {
                    return response.data.data.vendors;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return null;
            });
        return reponse;
    }

    async getStoreBySlug(payload) {
        const reponse = await Repository.get(
            `${baseStoreURL}/stores?slug=${payload}`
        )
            .then((response) => {
                if (response.data.length > 0) {
                    return response.data[0];
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getStoreProducts(payload) {
        const reponse = await Repository.get(
            `${base_url}vendor/${payload}/products`
        )
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getStoreItemsByKeyword(payload) {
        const reponse = await Repository.get(
            `${baseStoreURL}/posts?title_contains=${payload}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getPostItemsByCategory(payload) {
        const reponse = await Repository.get(
            `${baseStoreURL}/posts?title_contains=${payload}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new StoreRepository();
