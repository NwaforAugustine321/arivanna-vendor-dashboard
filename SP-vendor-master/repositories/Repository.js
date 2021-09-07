import axios from 'axios';

const baseDomain = 'https://beta.apinouthemes.com'; // API for products
export const basePostUrl = 'https://beta.apinouthemes.com'; // API for post
export const baseStoreURL = 'https://beta.apinouthemes.com'; // API for vendor(store)

export const mainBaseUrl = process.env.api_end_point;
export const customHeaders = {
    Accept: 'text/plain',
 
};

//export const baseUrl = `${baseDomain}`;
// export const base_url = `${baseDomain}`;
export const base_url = `${mainBaseUrl}`;
// export const baseUrl = `${mainBaseUrl}`;

export default axios.create({
    base_url,
    headers: {
        'Content-Type': 'text/plain',
    }
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};

// export const isGrapql = true;
// const baseDomain = 'http://localhost:1337';
/*const baseDomain = 'http://45.76.97.89:1337';*/
// const authorization_prefix = 'Bearer ';
// export const customHeaders = {
    // Accept: 'application/json',
    /* Authorization: authorization_prefix + token || undefined*/
// };

// export const baseUrl = `${baseDomain}`;

// export default axios.create({
//     baseUrl,
//     headers: customHeaders,
// });

// export async function fetchData(query) {
//     const response = await axios({
//         method: 'POST',
//         url: `${baseDomain}/graphql`,
//         headers: customHeaders,
//         data: {
//             query: query,
//         },
//     });

//     return response;
// }

// export const serializeQuery = (query) => {
//     return Object.keys(query)
//         .map(
//             (key) =>
//                 `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
//         )
//         .join('&');
// };
