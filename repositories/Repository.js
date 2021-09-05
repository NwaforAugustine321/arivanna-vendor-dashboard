import axios from 'axios';

const baseDomain = 'https://beta.apinouthemes.com'; // API for products
export const basePostUrl = 'https://beta.apinouthemes.com'; // API for post
export const baseStoreURL = 'https://beta.apinouthemes.com'; // API for vendor(store)
export const mainBaseUrl = process.env.api_end_point;
export const customHeaders = {
    Accept: 'application/json',
    'Content-Type':' text/plain',
};

export const baseUrl = `${baseDomain}`;
// export const base_url = `${baseDomain}`;
export const base_url = `${mainBaseUrl}`;
// export const baseUrl = `${mainBaseUrl}`;

export default axios.create({
    base_url,
  //  baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
