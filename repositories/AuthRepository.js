import axios from 'axios';
import Repository, { mainBaseUrl } from './Repository';

class AuthRepository {
    async login(payload) {
        let loginData = {
            token: null,
        };

        try {
            const response = await Repository.post(
                `${mainBaseUrl}/user_login`,
                payload
            );

            loginData = response.data;
        } catch (error) {
            loginData = error.data;

            if (error.status > 400 || error.status === 0) {
                throw new Error(error.data);
            } else {
                throw new Error(`Something went wrong`);
            }
        }
        return loginData;
    }
}

export default new AuthRepository();
