import WishListRepository from '~/repositories/WishListRepository';
import Router from 'next/router';

export const actionTypes = {
    GET_WISHLIST_LIST: 'GET_WISHLIST_LIST',
    GET_WISHLIST_LIST_SUCCESS: 'GET_WISHLIST_LIST_SUCCESS',
    GET_WISHLIST_LIST_ERROR: 'GET_WISHLIST_LIST_ERROR',

    ADD_ITEM_WISHLIST: 'ADD_ITEM_WISHLIST',
    REMOVE_ITEM_WISHLIST: 'REMOVE_ITEM_WISHLIST',

    UPDATE_WISHLISH_LIST: 'UPDATE_WISHLISH_LIST',
    UPDATE_WISHLISH_LIST_SUCCESS: 'UPDATE_WISHLISH_LIST_SUCCESS',
    UPDATE_WISHLISH_LIST_ERROR: 'UPDATE_WISHLISH_LIST_ERROR',

    CLEAR_WISHLISH_LIST: 'CLEAR_WISHLISH_LIST',
    USER_CLEAR_WISHLISH_LIST: 'USER_CLEAR_WISHLISH_LIST',
};

export function getWishlistList() {
    return { type: actionTypes.GET_WISHLIST_LIST };
}

export function getWishlistListSuccess(payload) {
    return {
        type: actionTypes.GET_WISHLIST_LIST_SUCCESS,
        payload
    };
}

export function addItemToWishlist(product) {
    let auth = JSON.parse(
        JSON.parse(localStorage.getItem('persist:martfury')).auth
    );
    if(auth.isLoggedIn){
        return { type: actionTypes.ADD_ITEM_WISHLIST, product };
    }else{
        Router.push('/account/login');
        return { type: "do-nothing", item: "" };
    }

}

export function removeWishlistItem(product) {
    return { type: actionTypes.REMOVE_ITEM_WISHLIST, product };
}

export function clearWishlist() {
    return { type: actionTypes.CLEAR_WISHLISH_LIST };
}

export function clearUserWishlist() {
    return { type: actionTypes.USER_CLEAR_WISHLISH_LIST };
}

export function updateWishlistListSuccess(payload) {
    return {
        type: actionTypes.UPDATE_WISHLISH_LIST_SUCCESS,
        payload,
    };
}


export function fetchWishList(auth){
    return (dispatch) => {

        WishListRepository.getWishList(auth).then((result) => {
            if (result.status === 200) {
               return result.data.data || []
            }else{
                return []
            }
        })
        .then((wish_list) => {
            dispatch(
                getWishlistListSuccess({
                    wishlistItems: wish_list,
                    wishlistTotal: wish_list.length,
                })
            );
        })
        .catch(err => {
        })
    }
}