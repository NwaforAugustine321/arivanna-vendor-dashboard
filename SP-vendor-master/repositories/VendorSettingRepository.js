import Repository, { baseUrl, base_url, serializeQuery } from "./Repository";

class VendorSettingRepository {

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

export default new VendorSettingRepository();
