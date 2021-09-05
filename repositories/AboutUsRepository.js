import Repository, { baseUrl, base_url, serializeQuery } from './Repository';

class AboutUsRepository {
    async getAboutUs() {
        const reponse = await Repository.get(
            `${base_url}about_us_get`
        )
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new AboutUsRepository();
