import Repository, { baseUrl, base_url, serializeQuery } from './Repository';
class CartRepository {
    async updateCartList(cart) {
        try {
            const local = JSON.parse(localStorage.getItem('persist:martfury'));

            if (local && local.auth) {
                const { token, id_user } = JSON.parse(local.auth);

                await Repository.post(base_url + 'cart_create', {
                    id_user,
                    token,
                    cart,
                });

                return Promise.resolve('success');
            }
        } catch (err) {
            return Promise.resolve('failed');
        }
    }

    getCartList = () => {
        const local = JSON.parse(localStorage.getItem('persist:martfury'));
        const { token, id_user } = JSON.parse(local.auth);

        if (token && id_user) {
            return Repository.post(`${base_url}cart_get`, { id_user, token })
                .then((response) => {
                    return response.data.data;
                })
                .catch((error) => ({ error: JSON.stringify(error) }));
        }
    };
}

export default new CartRepository();
