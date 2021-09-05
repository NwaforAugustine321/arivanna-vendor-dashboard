import Repository, { baseUrl, base_url } from './Repository';

class CollectionRepository {
    async getCollections(payload) {
        let query = '';
        payload.forEach((item) => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
        const reponse = await Repository.get(`${baseUrl}/collections?${query}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getCategories() {
        const reponse = await Repository.get(`${baseUrl}/categories_get`)
            .then((response) => {
                return response.data.categories_list;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getCategoriesBySlug(payload) {
        let query = '';
        payload.forEach((item) => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?${query}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsByCollectionSlug(slug) {
        const reponse = await Repository.get(
            `${base_url}/products?slug_in=${slug}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return { items: response.data[0].data };
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                return null;
            });
        return reponse;
    }

    async getProductsByCollectionSlug(slug) {
        let endpoint = '';
        if (slug === 'new-arrivals-products') {
            endpoint = 'product_newest';

            const reponse = await Repository.get(`${base_url}/${endpoint}`)
                .then((response) => {
                    if (response.data && response.data.length > 0) {
                        // return { items: response.data[0].data };
                    } else {
                        return null;
                    }
                    return response.data;
                })
                .catch((error) => {
                    return null;
                });
            return reponse;
        }
        return null;
    }

    async getProductsByCategorySlug(slug) {
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?slug_in=${slug}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return { items: response.data[0].products };
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                return null;
            });
        return reponse;
    }
}

export default new CollectionRepository();
