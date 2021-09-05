import Repository, { baseUrl, base_url, serializeQuery } from './Repository';
class WishListRepository {
    async createWishList(wishlist) {
        try {

            const local = JSON.parse(localStorage.getItem('persist:martfury'));

            if (local && local.auth) {
                const { token, id_user } = JSON.parse(local.auth);

                await Repository.post(base_url + 'wishlist_create', {
                    id_user,
                    token,
                    wishlist,
                });

                return Promise.resolve('success');
            }
        } catch (err) {
            return Promise.resolve('failed');
        }
    }

    async getWishList(auth) {
        try {
            const list = await Repository.post(base_url + 'wishlist_get', {
                id_user: auth.id_user,
                token: auth.token,
            });

            return Promise.resolve(list);
        } catch (err) {
            return Promise.resolve('failed');
        }
    }
}

export default new WishListRepository();
