import Repository, { baseUrl, base_url, serializeQuery } from './Repository';
class ProductRepository {
    async getRecords(id_category, keyword) {
        const reponse = await Repository.get(
            `${base_url}products/${id_category}/-/${keyword}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProducts(id_category, keyword) {
        try {
            let response;
            if (id_category && keyword) {
                response = await Repository.get(
                    `${base_url}products/${id_category}/-/${keyword}`
                );
            }
            if (id_category && !keyword) {
                response = await Repository.get(
                    `${base_url}products/${id_category}`
                );
            }
            if (!id_category && !keyword) {
                response = await Repository.get(`${base_url}products`);
            }

            return {
                items: response.data.data,
                totalItems: response.data.data.length,
            };
        } catch (error) {
            ({ error: JSON.stringify(error) });
        }
    }

    async getProductsDealOfTheDay(limit) {
        try {
            let response;
            if (limit) {
                response = await Repository.get(
                    `${base_url}promo_products/${limit}`
                );
            }
            if (!limit) {
                response = await Repository.get(`${base_url}promo_products`);
            }
            return response.data.data;
        } catch (error) {
            ({ error: JSON.stringify(error) });
        }
    }

    async getProductsNewArrival(limit) {
        try {
            let response;
            if (limit) {
                response = await Repository.get(
                    `${base_url}product_newest/${limit}`
                );
            }
            if (!limit) {
                response = await Repository.get(`${base_url}product_newest`);
            }
            return response.data.data;
        } catch (error) {
            ({ error: JSON.stringify(error) });
        }
    }

    async getBrands() {
        const reponse = await Repository.get(`${baseUrl}/brands`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductCategories() {
        const reponse = await Repository.get(`${base_url}product_categories`)
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getTotalRecords() {
        const reponse = await Repository.get(`${baseUrl}/products/count`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsById(payload) {
        const reponse = await Repository.get(`${base_url}product/${payload}`)
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsByCategory(payload) {
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?slug=${payload}`
        )
            .then((response) => {
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data[0];
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }
    async getProductsByBrand(payload) {
        const reponse = await Repository.get(
            `${baseUrl}/brands?slug=${payload}`
        )
            .then((response) => {
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data[0];
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }

    async getProductsByBrands(payload) {
        let query = '';
        payload.forEach((item) => {
            if (query === '') {
                query = `id_in=${item}`;
            } else {
                query = query + `&id_in=${item}`;
            }
        });
        const reponse = await Repository.get(`${baseUrl}/brands?${query}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsByPriceRange(payload) {
        const reponse = await Repository.get(
            `${baseUrl}/products?${serializeQuery(payload)}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getExchangeRatesLatest(currency = 'AUD') {
        const API_KEY =
            process.env.CURRENCY_API_KEY ?? '42a1ff23319037bb7a600234';
        const BASE_CURRENCY = process.env.BASE_CURRENCY ?? 'AUD';

        const result = await Repository.get(
            `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${BASE_CURRENCY}/${currency}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));

        return result;
    }
}

export default new ProductRepository();
