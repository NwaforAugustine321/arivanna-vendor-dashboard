import Repository, { baseUrl, base_url, serializeQuery } from './Repository';

class OrdersRepository {
    constructor(callback) {
        this.callback = callback;
    }
    async requestOrderUpdate(payload) {
        payload.token = JSON.parse(
            JSON.parse(localStorage.getItem('persist:martfury'))?.auth
        )?.token
        
        const response = await Repository.post(
            `${base_url}order_update`,
            payload
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }
}

export default new OrdersRepository();