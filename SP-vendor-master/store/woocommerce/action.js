export const actionTypes = {
  WOOCOMMERCE_PRODUCTS_LIST: "WOOCOMMERCE_PRODUCTS_LIST",
  WOOCOMMERCE_URL: "WOOCOMMERCE_URL",
  WOOCOMMERCE_CUSTOMER_KEY: "WOOCOMMERCE_CUSTOMER_KEY",
  WOOCOMMERCE_CUSTOMER_SECRET: "WOOCOMMERCE_CUSTOMER_SECRET",
};

export function setProducts(payload) {
  return { type: actionTypes.WOOCOMMERCE_PRODUCTS_LIST, payload };
}

export function setURL(payload){
  return {type: actionTypes.WOOCOMMERCE_URL, payload};
}

export function setCustomerKey(payload) {
  return {type: actionTypes.WOOCOMMERCE_CUSTOMER_KEY, payload};
}

export function setCustomerSecret(payload) {
  return {type: actionTypes.WOOCOMMERCE_CUSTOMER_SECRET, payload};
}
