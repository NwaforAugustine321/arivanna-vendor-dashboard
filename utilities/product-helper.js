/*
 * React template helpers
 * Author: Nouthemes
 * Developed: diaryforlife
 * */

import React from 'react';
import LazyLoad from 'react-lazyload';
import { baseUrl } from '~/repositories/Repository';
import Link from 'next/link';
import { SortingMethods } from './constant-class';
import { Currency } from './constant-class';


function convertCurrencyFromAUD(amount, currency, decimal) {

    switch (currency.text) {
        case Currency.AUD:
            return Number(amount).toFixed(decimal);
        case Currency.INR:
            return Number(amount * currency.rating).toFixed(decimal);
        default:
            return Number(amount).toFixed(decimal);
    }
}


export function formatCurrency(num, currency, decimal = 2) {

    if (num) {

        if (currency && currency.text) {

            switch (currency.text) {

                case Currency.AUD:
                    return convertCurrencyFromAUD(Number(num), currency, decimal)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                case Currency.INR:
                    return convertCurrencyFromAUD(Number(num), currency, decimal)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                default:
                    return Number(num)
                        .toFixed(decimal)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }

        }

        return
        Number(num)
            .toFixed(decimal)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    }

    return 0;

}

export function getColletionBySlug(collections, slug) {
    if (collections.length > 0) {
        const result = collections.find(
            (item) => item.slug === slug.toString()
        );
        if (result !== undefined) {
            return result.products;
        } else {
            return [];
        }
    } else {
        return [];
    }
}

export function getItemBySlug(banners, slug) {
    if (banners.length > 0) {
        const banner = banners.find((item) => item.slug === slug.toString());
        if (banner !== undefined) {
            return banner;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export function convertSlugsQueryString(payload) {
    let query = '';
    if (payload.length > 0) {
        payload.forEach((item) => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
    }
    return query;
}

export function StrapiProductBadge(product) {
    let view;
    if (product.badge && product.badge !== null) {
        view = product.badge.map((badge) => {
            if (badge.type === 'sale') {
                return <div className="ps-product__badge">{badge.value}</div>;
            } else if (badge.type === 'outStock') {
                return (
                    <div className="ps-product__badge out-stock">
                        {badge.value}
                    </div>
                );
            } else {
                return (
                    <div className="ps-product__badge hot">{badge.value}</div>
                );
            }
        });
    }
    return view;
}

// export function StrapiProductPrice(product, currency) {
//     let view;
//     if (product.is_sale === true) {
//         view = (
//             <p className="ps-product__price sale">
//                 ${formatCurrency(product.price, currency)}
//                 <del className="ml-2">
//                     ${formatCurrency(product.sale_price, currency)}
//                 </del>
//             </p>
//         );
//     } else {
//         view = (
//             <p className="ps-product__price">
//                 ${formatCurrency(product.p2v_promo_price, currency)}
//             </p>
//         );
//     }
//     return view;
// }

export function StrapiProductPrice(product, currency) {
    let view;
    if (product.is_sale) {
        view = (
                <p className="ps-product__price sale">
                    {currency.symbol}{formatCurrency(product.p2v_promo_price, currency)}
                    <del className="ml-2">{currency.symbol}{formatCurrency(product.p2v_price, currency)}</del>
                </p>
        );
    } else {
        view = (
            <p className="ps-product__price">
                {currency.symbol}{formatCurrency(product.p2v_price, currency)}
            </p>
        );
    }
    return view;
}
export function StrapiProductPriceShopItems(product, currency) {
    let view;
    if (product.is_sale) {
        view = (
            <div>
                <p className="ps-product__price sale">
                    {currency.symbol}{formatCurrency(product.p2v_promo_price, currency)}
                    <del className="ml-2">{currency.symbol}{formatCurrency(product.p2v_price, currency)}</del>
                </p>
            </div>
        );
    } else {
        view = (
            <p className="ps-product__price">
                {currency.symbol}{formatCurrency(product.p2v_price, currency)}
            </p>
        );
    }
    return view;
}

export function StrapiProductPriceExpanded(product, currency) {
    let view;
    if (product.is_sale) {
        view = (
            <div>
                <p className="ps-product__price sale">
                    {currency.symbol}{formatCurrency(product.p2v_promo_price, currency)}
                    <del className="ml-2">
                        {currency.symbol}{formatCurrency(product.p2v_price, currency)}
                    </del>
                    <small>{product.p2v_promo_off.toFixed(2)}% off</small>
                </p>
            </div>

            // <div>
            //     <p className="ps-product__price sale">
            //         {currency.symbol}{formatCurrency(product.p2v_promo_price, currency)}
            //     </p>
            //     <p className="ps-product__price sale">
            //         <del className="ml-2">{currency.symbol}{formatCurrency(product.p2v_price, currency)}</del>
            //         <small>{product.p2v_promo_off}% off</small>
            //     </p>
            // </div>
        );
    } else {
        view = (
            <p className="ps-product__price">
                {currency.symbol}{formatCurrency(product.p2v_price, currency)}
            </p>
        );
    }
    return view;
}

export function StrapiProductThumbnail(product) {
    let view;

    if (product.url) {
        view = (
            <Link
                href="/product/[pid]"
                as={`/product/${product.id_product_m2m_vendor}`}>
                <a className="img-anchor">
                    <LazyLoad>
                        <img
                            style={{ width: '150px', height: '150px', margin: 'auto' }}
                            src={product.url}
                            alt={product.title}
                        />
                    </LazyLoad>
                </a>
            </Link>
        );
    } else {
        view = (
            <Link
                href="/product/[pid]"
                as={`/product/${product.id_product_m2m_vendor}`}>
                <a className="img-anchor">
                    <LazyLoad>
                        <img 
                            style={{ width: '150px', height: '150px', margin: 'auto' }}
                            src="/static/img/not-found.jpg" 
                            alt="martfury" 
                        />
                    </LazyLoad>
                </a>
            </Link>
        );
    }

    return view;
}
export function StrapiProductThumbnailHorizontal(product) {
    let view;

    if (product.url) {
        view = (
            <Link
                href="/product/[pid]"
                as={`/product/${product.id_product_m2m_vendor}`}>
                <a>
                    <LazyLoad>
                        <img
                            style={{ width: '100px' }}
                            src={product.url}
                            alt={product.title}
                        />
                    </LazyLoad>
                </a>
            </Link>
        );
    } else {
        view = (
            <Link
                href="/product/[pid]"
                as={`/product/${product.id_product_m2m_vendor}`}>
                <a>
                    <LazyLoad>
                        <img src="/static/img/not-found.jpg" alt="martfury" />
                    </LazyLoad>
                </a>
            </Link>
        );
    }

    return view;
}
export function StrapiProductThumbnailDealOfDay(product) {
    let view;

    if (product.url) {
        view = (
            <Link
                href="/product/[pid]"
                as={`/product/${product.id_product_m2m_vendor}`}>
                <a>
                    <LazyLoad>
                        <img
                            className="img-fluid inline-photo"
                            src={product.url}
                            alt={product.title}
                        />
                    </LazyLoad>
                </a>
            </Link>
        );
    } else {
        view = (
            <Link
                href="/product/[pid]"
                as={`/product/${product.id_product_m2m_vendor}`}>
                <a>
                    <LazyLoad>
                        <img src="/static/img/not-found.jpg" alt="martfury" />
                    </LazyLoad>
                </a>
            </Link>
        );
    }

    return view;
}


export const sortProductsList = (list = [], sort = SortingMethods.LATEST) => {

    switch (sort) {
        case SortingMethods.LATEST:
            return list.sort((productA, productB) => productB.id_product - productA.id_product)
        case SortingMethods.POPULARITY:
            return list;
        case SortingMethods.RATING:
            return list;
        case SortingMethods.PRICELH:
            return list.sort((productA, productB) => (productA.p2v_price) - (productB.p2v_price))
        case SortingMethods.PRICEHL:
            return list.sort((productA, productB) => (productB.p2v_price) - (productA.p2v_price))
        default: return list;
    }

};


export const checkIfShippingAvailableForLocation = (product) => {

    if (!product) {
        return null;
    }

    const auth = JSON.parse(
        JSON.parse(localStorage.getItem('persist:martfury'))?.auth ?? '{}'
    )

    const country = auth?.country;

    const city = auth?.city;

    var shipping_locations = product.shipping_locations ? JSON.parse(product.shipping_locations) : {};

    if (typeof shipping_locations === 'string') {
        shipping_locations = JSON.parse(shipping_locations)
    }

    var isShippingAvailable = false;

    if (shipping_locations) {
        if (Object.keys(shipping_locations).includes(country)) {
            if (shipping_locations[country].length) {
                isShippingAvailable = shipping_locations[country].includes(city);
            } else {
                isShippingAvailable = true
            }

        }
    }

    return isShippingAvailable;

}

export const checkIfShippingAvailableAllCart = (location = {}) => {

    var isShippingAvailable = true;

    var country, city = null;

    const local = JSON.parse(localStorage.getItem('persist:martfury'));

    const auth = JSON.parse(local?.auth);
    const cart = JSON.parse(local?.cart);

    if (location?.country) {
        country = location.country;
        city = location?.city;
    } else {
        country = auth?.country;
        city = auth?.city;
    }

    if (Array.isArray(cart?.cartItems)) {
        for (let i = 0; i < cart.cartItems.length; i++) {
            const product = cart.cartItems[i];

            var shipping_locations = product.shipping_locations ? JSON.parse(product.shipping_locations) : {};

            if (typeof shipping_locations === 'string') {
                shipping_locations = JSON.parse(shipping_locations)
            }

            if (shipping_locations) {
                if (Object.keys(shipping_locations).includes(country)) {
                    if (shipping_locations[country].length) {
                        isShippingAvailable = shipping_locations[country].includes(city);
                    }
                }else{
                    isShippingAvailable = false
                }
            }

            if (!isShippingAvailable) {
                break;
            }

        }
    }



    return isShippingAvailable;

}