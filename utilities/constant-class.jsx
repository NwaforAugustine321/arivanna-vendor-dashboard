export const AccessLevel = {
    DEV_ACCESS_LEVEL: 0, // - private
    USER_VENDOR_TM_LEVEL: 1, //(vendor team member - access after-login) - private
    USER_BUYER_ACCESS_LEVEL: 2, //(buyers - access after-login) - private
    USER_ACCESS_LEVEL: 3, //(all users - access after-login)
    PUBLIC_ACCESS_LEVEL: 4, //(all users - access Before-login) - public variation - 1
    ALWAYS_ACCESS_LEVEL: 5, //(all users - always access) - public variation - 2
};

export const SortingMethods = {
    LATEST: 'LATEST',
    POPULARITY: 'POPULARITY',
    RATING: 'RATING',
    PRICELH: 'PRICELH',
    PRICEHL: 'PRICEHL',
};

export const Currency = {
    AUD: 'AUD',
    INR:  'INR'
};



// import { AccessLevel } from '~/utilities/constant-class';
// AccessLevel.ALWAYS_ACCESS_LEVEL
// ----------------------
// account
//  checkout-3.
//  login-4.
//  order-tracking-3
//  register-4
//  shopping-cart-3
//  whishlist-3
// home
//  technology-5
// page
//   about-us-5
//   contact-us-5
//   faqs.jsx-5
//   page-404.jsx5
// product
//    countdown5
//    ProductDefaulCountdown-5
//  full content-5
//    ProductDefaultPage-5
//  imageswatches-5
//      ProductDetailHasVariantsPage-5
// ProductDefaultPage-5
// search
//   searchPage-5
// shop
//   shopdefaultpage-5
//   shop-category-page-5
// stores
//   storeListPage-5
// vendor
//   become a vendor-5
//   vendor-store-5
