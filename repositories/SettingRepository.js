import Repository from './Repository';

class SettingRepository {

    async getCountryDetection(currency = 'AUD') {

        const SERVICE_URL = 'https://extreme-ip-lookup.com/json';

        const result = await Repository.get(SERVICE_URL).then((response) => {
            return response;
        }).catch((error) => ({ error: JSON.stringify(error) }));

        return result;
    }

    async getExchangeRatesLatest(currency = 'AUD') {

        const API_KEY = '52c80668116b65a13b454be9';
        const BASE_CURRENCY = 'AUD';

        const result = await Repository.get(
            `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${BASE_CURRENCY}/${currency}`
        ).then((response) => {
            return response.data;
        }).catch((error) => ({ error: JSON.stringify(error) }));

        return result;
    }
}

export default new SettingRepository();
