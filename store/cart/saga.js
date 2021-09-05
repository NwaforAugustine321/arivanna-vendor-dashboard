import { all, put, takeEvery, call } from 'redux-saga/effects';
import { notification } from 'antd';
import CartRepository from '~/repositories/CartRepository';

import {
    actionTypes,
    getCartError,
    getCartSuccess,
    updateCartSuccess,
    updateCartError,
    updateShippingCostSuccess,
} from './action';

const modalSuccess = (type, data) => {
    notification[type]({
        message: 'Success',
        description: data + ' has been added to your cart!',
        duration: 1,
    });
};
const modalWarning = (type, deletedItem) => {
    const { product_title } = deletedItem[0];
    notification[type]({
        message: `${product_title}`,
        description: 'This product has been removed from your cart!',
        duration: 1,
    });
};

export const calculateAmount = (obj) =>
    obj
        .reduce(
            (acc, { quantity, p2v_price, p2v_promo_price, is_sale }) =>
                is_sale
                    ? acc + quantity * p2v_promo_price
                    : acc + quantity * p2v_price,
            0
        )
        .toFixed(2);

export const calculateTotalShippingCost = (list = [], country = null) => {
    var location = 'AU';

    if (country) {
        location = country;
    } else {
        const user = JSON.parse(
            JSON.parse(localStorage.getItem('persist:martfury')).auth
        );

        location = user?.country ?? 'AU';
    }

    const products = [];

    list.forEach(product => {

        if (product.shipping_cost_local || product.shipping_cost_intl) {

            if (product.is_combined_shipping) {

                if (products.find(p => (p.id_vendor === product.id_vendor && p.is_combined_shipping))) {

                    const isShippingAddedForThisProduct = products.find(p => (
                        p.id_vendor === product.id_vendor
                        && p.is_combined_shipping
                        && Number(p.shipping_cost_local) < Number(product.shipping_cost_local)
                    ));

                    if (isShippingAddedForThisProduct) {
                        products.splice(products.findIndex(p => p.id_product === isShippingCostLowerThan.id_product), 1, product)
                    }

                } else {
                    products.push(product)
                }

            } else {
                products.push(product)
            }

        }

    })

    console.log(products, 'P')

    const shipping_cost_product_ids = products.map(p => p.id_product_m2m_vendor);

    const shipping = products.reduce((amount, product) => {
        if (product?.shipping_cost_local && product?.shipping_cost_intl) {
            const rate_applied =
                location === product.vendor_country
                    ? product.shipping_cost_local
                    : product.shipping_cost_intl;

            if (rate_applied) {
                amount += Number(rate_applied);
            }

            return amount;
        }

        return amount;
    }, 0);

    return { shipping, shipping_cost_product_ids };
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* getCartSaga() {
    try {
        // get carts from DB

        yield delay(100); // to let the store change to logged in

        let response = yield call(CartRepository.getCartList); //Get request

        if (response.error) {
            throw response.error;
        } else {
            // add to store
            let currentCart = {};
            currentCart.cartItems = [];
            currentCart.amount = 0;
            currentCart.shipping = 0;
            currentCart.cartTotal = 0;

            response.map((product) => {
                currentCart.cartItems.push(product);
                currentCart.amount = calculateAmount(currentCart.cartItems);

                const shipping_object = calculateTotalShippingCost(
                    currentCart.cartItems
                )

                currentCart.shipping = shipping_object.shipping;
                currentCart.shipping_cost_product_ids = shipping_object.shipping_cost_product_ids;
                currentCart.cartTotal += product.quantity;
            });

            yield put(updateCartSuccess(currentCart));
        }
    } catch (err) { }
}

function* addItemSaga(payload) {
    try {
        const { product } = payload;
        const localCart = JSON.parse(localStorage.getItem('persist:martfury'))
            .cart;
        let currentCart = JSON.parse(localCart);
        let existItem = currentCart.cartItems.find(
            (item) =>
                item.id_product_m2m_vendor === product.id_product_m2m_vendor
        );
        if (existItem) {
            existItem.quantity += product.quantity;
        } else {
            if (!product.quantity) {
                product.quantity = 1;
            }
            currentCart.cartItems.push(product);
        }
        currentCart.amount = calculateAmount(currentCart.cartItems);

        const shipping_object = calculateTotalShippingCost(
            currentCart.cartItems
        )

        currentCart.shipping = shipping_object.shipping;
        currentCart.shipping_cost_product_ids = shipping_object.shipping_cost_product_ids;

        currentCart.cartTotal++;
        yield put(updateCartSuccess(currentCart));
        modalSuccess('success', product.product_title);
        yield CartRepository.updateCartList(currentCart.cartItems);
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* removeItemSaga(payload) {
    try {
        const { product } = payload;

        let localCart = JSON.parse(
            JSON.parse(localStorage.getItem('persist:martfury')).cart
        );

        let index = localCart.cartItems.findIndex(
            (item) =>
                item.id_product_m2m_vendor === product.id_product_m2m_vendor
        );

        localCart.cartTotal = localCart.cartTotal - product.quantity;
        let cartDeletedItem = localCart.cartItems.splice(index, 1);
        localCart.amount = calculateAmount(localCart.cartItems);

        const shipping_object = calculateTotalShippingCost(
            localCart.cartItems
        )

        localCart.shipping = shipping_object.shipping;
        localCart.shipping_cost_product_ids = shipping_object.shipping_cost_product_ids;

        if (localCart.cartItems.length === 0) {
            localCart.cartItems = [];
            localCart.amount = 0;
            localCart.cartTotal = 0;
        }
        yield put(updateCartSuccess(localCart));
        modalWarning('warning', cartDeletedItem);
        yield CartRepository.updateCartList(localCart.cartItems);
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* increaseItemQtySaga(payload) {
    try {
        const { product } = payload;
        let localCart = JSON.parse(
            JSON.parse(localStorage.getItem('persist:martfury')).cart
        );

        let selectedItem = localCart.cartItems.find(
            (item) =>
                item.id_product_m2m_vendor === product.id_product_m2m_vendor
        );
        if (selectedItem) {
            selectedItem.quantity++;
            localCart.cartTotal++;
            localCart.amount = calculateAmount(localCart.cartItems);

            const shipping_object = calculateTotalShippingCost(
                localCart.cartItems
            )

            localCart.shipping = shipping_object.shipping;
            localCart.shipping_cost_product_ids = shipping_object.shipping_cost_product_ids;
        }
        yield put(updateCartSuccess(localCart));
        yield CartRepository.updateCartList(localCart.cartItems);
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* decreaseItemQtySaga(payload) {
    try {
        const { product } = payload;
        const localCart = JSON.parse(
            JSON.parse(localStorage.getItem('persist:martfury')).cart
        );
        let selectedItem = localCart.cartItems.find(
            (item) =>
                item.id_product_m2m_vendor === product.id_product_m2m_vendor
        );

        if (selectedItem) {
            selectedItem.quantity > 1
                ? selectedItem.quantity--
                : selectedItem.quantity;
            localCart.cartTotal--;
            localCart.amount = calculateAmount(localCart.cartItems);

            const shipping_object = calculateTotalShippingCost(
                localCart.cartItems
            )

            localCart.shipping = shipping_object.shipping;
            localCart.shipping_cost_product_ids = shipping_object.shipping_cost_product_ids;
        }
        yield put(updateCartSuccess(localCart));
        yield CartRepository.updateCartList(localCart.cartItems);
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* clearCartSaga() {
    try {
        const emptyCart = {
            cartItems: [],
            amount: 0,
            cartTotal: 0,
            shipping: 0,
        };
        yield put(updateCartSuccess(emptyCart));
        yield CartRepository.updateCartList([]);
    } catch (err) {
        yield put(updateCartError(err));
    }
}

function* updateShippingCost({ country }) {
    try {
        const cart = JSON.parse(
            JSON.parse(localStorage.getItem('persist:martfury')).cart
        );

        const shipping_object = calculateTotalShippingCost(cart.cartItems, country);

        const shipping = shipping_object.shipping;
        const shipping_cost_product_ids = shipping_object.shipping_cost_product_ids;

        yield put(updateShippingCostSuccess({ shipping, shipping_cost_product_ids }));
    } catch (err) {
        yield put(getCartError(err));
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CART, getCartSaga)]);
    yield all([takeEvery(actionTypes.ADD_ITEM, addItemSaga)]);
    yield all([takeEvery(actionTypes.REMOVE_ITEM, removeItemSaga)]);
    yield all([takeEvery(actionTypes.INCREASE_QTY, increaseItemQtySaga)]);
    yield all([takeEvery(actionTypes.DECREASE_QTY, decreaseItemQtySaga)]);
    yield all([takeEvery(actionTypes.CLEAR_CART, clearCartSaga)]);
    yield all([
        takeEvery(actionTypes.UPDATE_SHIPPING_COST, updateShippingCost),
    ]);
}
