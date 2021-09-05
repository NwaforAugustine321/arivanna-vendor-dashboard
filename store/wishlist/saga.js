import { all, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import {
    actionTypes,
    getWishlistListSuccess,
    updateWishlistListSuccess,
} from './action';
import WishListRepository from '~/repositories/WishListRepository';

const modalSuccess = (type, product) => {
    notification[type]({
        message: 'Success!',
        description: `${product} added to wishlist!`,
    });
};

const modalWarning = (type, payload) => {
    let product = payload.product;

    notification[type]({
        message: 'Removed from Wishlist',
        description: `${product.product_title} removed from wishlist!`,
    });
};

function* getWishlistListSaga() {
    try {
        const localWishlistList = JSON.parse(
            localStorage.getItem('persist:martfury')
        ).wishlist;
        yield put(getWishlistListSuccess(localWishlistList));
    } catch (err) {
    }
}

function* addItemToWishlistSaga(payload) {
    try {
        const { product } = payload;
        let localWishlist = JSON.parse(
            JSON.parse(localStorage.getItem('persist:martfury')).wishlist
        );

        let existItem = localWishlist.wishlistItems.find(
            (item) =>
                item.id_product_m2m_vendor === product.id_product_m2m_vendor
        );

        if (!existItem) {
            localWishlist.wishlistItems.push(product);
            localWishlist.wishlistTotal++;
            yield put(updateWishlistListSuccess(localWishlist));
            modalSuccess('success', product.product_title);
            yield WishListRepository.createWishList(localWishlist.wishlistItems);
        } 
    } catch (err) {
    }
}

function* removeItemWishlistSaga(payload) {
    try {
        const { product } = payload;
        let localWishlist = JSON.parse(
            JSON.parse(localStorage.getItem('persist:martfury')).wishlist
        );

        let removeIndex = localWishlist.wishlistItems
            .map(function (item) {
                return item.id_product_m2m_vendor;
            })
            .indexOf(product.id_product_m2m_vendor);

        localWishlist.wishlistTotal = localWishlist.wishlistTotal - 1;
        localWishlist.wishlistItems.splice(removeIndex, 1);
        yield put(updateWishlistListSuccess(localWishlist));
        modalWarning('warning', payload);
        yield WishListRepository.createWishList(localWishlist.wishlistItems);
    } catch (err) {
    }
}

function* clearWishlistListSaga() {
    try {
        const emptyCart = {
            wishlistItems: [],
            wishlistTotal: 0,
        };
        yield put(updateWishlistListSuccess(emptyCart));

        yield WishListRepository.createWishList([]);
    } catch (err) {
    }
}

export default function* rootSaga() {
    // yield all([takeEvery(actionTypes.GET_WISHLIST_LIST, getWishlistListSaga)]);
    yield all([
        takeEvery(actionTypes.ADD_ITEM_WISHLIST, addItemToWishlistSaga),
    ]);
    yield all([
        takeEvery(actionTypes.REMOVE_ITEM_WISHLIST, removeItemWishlistSaga),
    ]);
    yield all([
        takeEvery(actionTypes.CLEAR_WISHLISH_LIST, clearWishlistListSaga),
    ]);
}
