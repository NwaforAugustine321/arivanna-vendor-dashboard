import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pagination, Switch } from 'antd';
import Product from '~/components/elements/products/Product';
import ProductWide from '~/components/elements/products/ProductWide';
import ProductRepository from '~/repositories/ProductRepository';
import ModuleShopSortBy from '~/components/partials/shop/modules/ModuleShopSortBy';
import { useRouter } from 'next/router';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { useRef } from 'react';
import moment from 'moment';
import { sortProductsList } from '~/utilities/product-helper';
import { SortingMethods } from '~/utilities/constant-class';
import { Tooltip } from 'reactstrap';

const TooltipIcon = (props) => {
    const { item, placeholder } = props;
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <span>
            <i className={'icon-' + item} id={'Tooltip-' + item}></i>
            <Tooltip
                placement="bottom"
                isOpen={tooltipOpen}
                target={'Tooltip-' + item}
                toggle={toggle}>
                {placeholder}
            </Tooltip>
        </span>
    );
};

const ShopItems = ({
    columns = 4,
    pageSize = 12,
    searchValue,
    disabledShipping,
}) => {
    const Router = useRouter();
    const { page, price_gt, price_lt } = Router.query;
    const { query } = Router;
    const [listView, setListView] = useState(false);
    const [productItems, setProductItems] = useState(null);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showAvailable, setShowAvailable] = useState(true);

    let userCountry;
    let userCity = '';
    if (typeof window !== 'undefined') {
        userCountry = JSON.parse(
            JSON.parse(localStorage.getItem('persist:martfury')).auth
        ).country;
        userCity = JSON.parse(
            JSON.parse(localStorage.getItem('persist:martfury')).auth
        ).city;
    }


    const [sort, setSort] = useState(SortingMethods.LATEST);

    const [classes, setClasses] = useState(
        'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6'
    );
    const handleShowAvailable = () => {
        console.log(showAvailable, userCountry)
        setShowAvailable((prevState) => !prevState);
    };

    const enableListGridView = useCallback(
        (view, event) => {
            event.preventDefault();
            setListView(view === 'list');
        },
        [setListView]
    );

    async function getProducts() {
        setLoading(true);
        let responseData;
        if (query.category) {
            responseData = await ProductRepository.getProducts(query.category);
        } else {
            responseData = await ProductRepository.getProducts();
        }

        if (responseData) {
            setProductItems(responseData.items);
            if (disabledShipping && userCountry) {
                // test if users country in the shipping var
                let filterd = responseData.items.filter((product) =>
                    JSON.parse(product.shipping_locations)[userCountry]
                        ? JSON.parse(product.shipping_locations)[userCountry]
                            .length !== 0
                            ? JSON.parse(product.shipping_locations)[
                                userCountry
                            ].includes(userCity)
                            : true
                        : false
                );
    
                setTotal(filterd.length);
            } else {
                setTotal(responseData.totalItems);
            }

            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        if (query.category) {
            Router.push(
                `/shop?category=${query.category}&name=${query.name}&page=${page || 1
                }`
            );
        } else {
            Router.push(`/shop?page=${page || 1}`);
        }
        getProducts();
    }, [query.category, query.page]);

    function priceFilter(products) {
        if (price_lt && price_gt) {
            // p2v_price
            let filterd = 0;
            filterd = products
                .filter((product) => {
                    return product.is_sale
                        ? product.p2v_promo_price > price_gt
                        : product.p2v_price > price_gt;
                })
                .filter((product) => {
                    return product.is_sale
                        ? product.p2v_promo_price < price_lt
                        : product.p2v_price < price_lt;
                });

            if (filterd.length !== total) setTotal(filterd.length);

            return filterd;
        } else {
            if (products.length !== total) setTotal(products.length);
            return products;
        }
    }
    function searchProcductByKeyword(products) {
        if (searchValue) {
            // toLowercase to make it case insensitive
            let filterd = products.filter((product) =>
                product.product_title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            );

            if (filterd.length !== total) setTotal(filterd.length);
            return filterd;
        } else {
            if (products.length !== total) setTotal(products.length);
            return products;
        }
    }
    function productCanBeShippedToYourArea(products) {
        if (disabledShipping && userCountry) {
            // test if users country in the shipping var
            let filterd = products.filter((product) =>
                JSON.parse(product.shipping_locations)[userCountry]
                    ? JSON.parse(product.shipping_locations)[userCountry]
                        .length !== 0
                        ? JSON.parse(product.shipping_locations)[
                            userCountry
                        ].includes(userCity)
                        : true
                    : false
            );

            if (filterd.length !== total) setTotal(filterd.length);

            return filterd;
        } else {
            if (products.length !== total) setTotal(products.length);

            return products;
        }
    }

    function handlePagination(page, pageSize) {
        if (query.category) {
            if (price_gt && price_lt)
                Router.push(
                    `/shop?category=${query.category}&name=${query.name}&page=${page}&price_gt=${price_gt}&price_lt=${price_lt}`
                );
            else
                Router.push(
                    `/shop?category=${query.category}&name=${query.name}&page=${page}`
                );
        } else {
            if (price_gt && price_lt)
                Router.push(
                    `/shop?page=${page}&price_gt=${price_gt}&price_lt=${price_lt}`
                );
            else Router.push(`/shop?page=${page}`);
        }
    }

    function handleSetColumns() {
        switch (columns) {
            case 2:
                setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6');
                return 3;
                break;
            case 4:
                setClasses('col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6');
                return 4;
                break;
            case 6:
                setClasses('col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6');
                return 6;
                break;

            default:
                setClasses('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
        }
    }

    const onUpdateSorting = useCallback(
        ({ target: { value: selection } }) => {
            setSort(selection);
        },
        [setSort]
    );

    // Views
    let productItemsView = useMemo(() => {
        if (!loading) {
            if (productItems && productItems.length > 0) {
                if (!listView) {
                    const items = (
                        showAvailable
                            ? searchProcductByKeyword(
                                priceFilter(
                                    productCanBeShippedToYourArea(
                                        sortProductsList(productItems, sort)
                                    )
                                )
                            )
                            : searchProcductByKeyword(
                                priceFilter(sortProductsList(productItems, sort))
                            )
                    )
                        .slice(
                            pageSize * (page - 1),
                            pageSize * (page - 1) + pageSize
                        )
                        .map((item) => (
                            <div className={classes} key={item.id_product}>
                                <Product product={item} />
                            </div>
                        ));
                    //console.log('items:,', items);
                    return (
                        <div className="ps-shop-items">
                            <div className="row">{items}</div>
                        </div>
                    );
                } else {
                    return (
                        showAvailable
                            ? searchProcductByKeyword(
                                priceFilter(
                                    productCanBeShippedToYourArea(
                                        sortProductsList(productItems, sort)
                                    )
                                )
                            )
                            :  searchProcductByKeyword(
                                priceFilter(sortProductsList(productItems, sort))
                            )
                    ).slice(
                            pageSize * (page - 1),
                            pageSize * (page - 1) + pageSize
                    ).map((item) => (
                        <div className="ps-shop-items" key={item.id_product}>
                            <ProductWide product={item} />
                        </div>
                    ));
                }
            } else {
                return <p>No product found.</p>;
            }
        } else {
            const skeletonItems = generateTempArray(12).map((item) => (
                <div className={classes} key={item}>
                    <SkeletonProduct />
                </div>
            ));
            return <div className="row">{skeletonItems}</div>;
        }
    }, [loading, productItems, listView, showAvailable, sort, searchValue]);



    return (
        <div className="ps-shopping">
            <div className="ps-shopping__header">
                <p>
                    <strong className="mr-2">{total}</strong>
                    Products found
                </p>

                <div className="ps-shopping__actions">
                    <ModuleShopSortBy
                        sort={sort}
                        onUpdateSorting={onUpdateSorting}
                    />

                    <div className="ps-shopping__view">
                        {showAvailable && userCountry ? (
                            <p style={{ width: '120px' }}>
                                Available in {userCountry}
                            </p>
                        ) : (
                            <p style={{ width: '120px' }}>All products</p>
                        )}
                        <p>
                            <Switch
                                defaultChecked
                                onChange={handleShowAvailable}
                            />
                        </p>
                        <p>View</p>
                        <ul className="ps-tab-list">
                            <li className={listView !== true ? 'active' : ''}>
                                <a
                                    href="#"
                                    onClick={enableListGridView.bind(
                                        null,
                                        'grid'
                                    )}>
                                    <TooltipIcon
                                        item="grid"
                                        placeholder="Products: Grid view"
                                    />
                                </a>
                            </li>
                            <li className={listView === true ? 'active' : ''}>
                                <a
                                    href="#"
                                    onClick={enableListGridView.bind(
                                        null,
                                        'list'
                                    )}>
                                    <TooltipIcon
                                        item="list4"
                                        placeholder="Products: Tile view"
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="ps-shopping__content">{productItemsView}</div>
            <div className="ps-shopping__footer text-center">
                <div className="ps-pagination">
                    <Pagination
                        total={total - 1}
                        pageSize={pageSize}
                        responsive={true}
                        showSizeChanger={false}
                        current={page !== undefined ? parseInt(page) : 1}
                        onChange={(e) => handlePagination(e)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShopItems;
