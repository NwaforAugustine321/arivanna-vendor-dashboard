import Repository, { baseUrl, base_url, serializeQuery } from './Repository';

class UserInformationRepository {
    async getUserById(payload) {
        const reponse = await Repository.get(
            `${base_url}user_details/${payload}`
        )
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async updateUser(payload) {
        if (!payload.token) {
            payload.token = JSON.parse(
                JSON.parse(localStorage.getItem('persist:martfury'))?.auth
            )?.token;
        }

        const response = await Repository.post(
            `${base_url}user_update`,
            JSON.stringify(payload)
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getOrderDetails(payload) {
        const response = await Repository.post(
            `${base_url}user/orders`,
            payload
        );
        return response;
    }
    async updateUserPassword(payload) {
        const response = await Repository.post(
            `${base_url}forgot_password`,
            JSON.stringify(payload)
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }
    async resendVerificationEmail(payload) {
        const response = await Repository.post(
            `${base_url}user_resend_verification`,
            JSON.stringify(payload)
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async userVerify(payload) {
        const result = await Repository.post(`${base_url}user_verify`, payload)
            .then((res) => {
                return res;
            })
            .catch((e) => {});

        return result;
    }

    async verifyPassowordToken(payload) {
        const response = await Repository.post(
            `${base_url}verify/password/token`,
            JSON.stringify(payload)
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async resetPassword(payload) {
        const response = await Repository.post(
            `${base_url}reset/password`,
            JSON.stringify(payload)
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }
}

export default new UserInformationRepository();
