import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

function wooCommerceConfig(url, consumerKey, consumerSecret) {
  return new WooCommerceRestApi({
    url: url,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    version: "wc/v3",
    wpAPI: true,
  });
}

// Fetch all products
export async function getAllProducts(url, customerKey, customerSecret) {
  const result = {};
  const api = wooCommerceConfig(url, customerKey, customerSecret);
  await api
    .get("products", { per_page: 20 })
    .then((response) => {
      result.data = response.data;
      result.status = response.status;
      result.totalPages = response.headers["x-wp-totalpages"];
      result.totalItems = response.headers["x-wp-total"];
    })
    .catch((error) => {
      result.data = error.response;
      //result.status = error.response.status;
    });
  return result;
}

// Create a product
export async function createProduct(url, customerKey, customerSecret, data) {
  const result = {};
  const api = wooCommerceConfig(url, customerKey, customerSecret);
  await api
    .post("products", data)
    .then((response) => {
      Object.assign(response, result);
    })
    .catch((error) => {
      Object.assign(error, result);
    })
    .finally(() => {
      // Always executed.
    });
  return result;
}
