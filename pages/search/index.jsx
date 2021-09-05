import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import ContainerPage from '~/components/layouts/ContainerPage';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductRepository from '~/repositories/ProductRepository.js';
import Product from '~/components/elements/products/Product';
import ProductGroupGridItems from '~/components/partials/product/ProductGroupGridItems';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';
const SearchPage = ({ query }) => {
    const [pageSize] = useState(100);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState(0);
    const [loading, setLoading] = useState(true);
    const [productItems, setProductItems] = useState(null);

    function handleSetKeyword() {
        if (query && query.keyword !== '') {
            setKeyword(query.keyword);
        }

        if (query && query.category !== '') {
            setCategory(query.category);
        }
    }

    async function getProductsByKeywordAndCategory(category, keyword) {
        handleSetKeyword();
        const queries = {
            _limit: pageSize,
            title_contains: keyword,
        };
        setLoading(true);
        const SPProducts = await ProductRepository.getProducts(
            category,
            keyword
        );

        if (SPProducts) {
            if (SPProducts.items.length > 0) {
                setProductItems(SPProducts);
            } else {
                setProductItems(null);
            }

            setTimeout(function () {
                setLoading(false);
            }, 500);

            return SPProducts;
        } else {
            setProductItems(null);
            setLoading(false);
            return null;
        }
    }

    useEffect(() => {
        getProductsByKeywordAndCategory(query.category, query.keyword);
    }, [query]);

    const breadcrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Search Result',
        },
    ];

    let shopItemsView, statusView;
    if (!loading) {
        if (productItems) {
            shopItemsView = (
                <ProductGroupGridItems columns={6} pageSize={pageSize} />
            );
            if (productItems.items.length > 0) {
                const items = productItems.items.map((item) => {
                    return (
                        <div
                            className="col-md-3 col-sm-6 col-6"
                            key={item.id_product_m2m_vendor}>
                            <Product product={item} />
                        </div>
                    );
                });
                shopItemsView = (
                    <div className="ps-product-items row">{items}</div>
                );
                statusView = (
                    <p>
                        <strong style={{ color: '#000' }}>
                            {productItems.totalItems}
                        </strong>{' '}
                        record(s) found.
                    </p>
                );
            } else {
                shopItemsView = <p>No product(s) found.</p>;
            }
        } else {
            shopItemsView = <p>No product(s) found.</p>;
        }
    } else {
        statusView = (
            <div>
                <Spin /> Searching...
            </div>
        );

        // statusView = <p>No product(s) found.</p>;
    }

    return (
        <ContainerPage title={`Search results for: "${keyword}" `} boxed={true}>
            <div className="ps-page">
                <BreadCrumb breacrumb={breadcrumb} />
            </div>
            <div className="container">
                <div className="ps-shop ps-shop--search">
                    <div className="container">
                        <div
                            className={`ps-shop__content ${
                                productItems ? 'mt-10' : 'mt-100 mb-100'
                            } `}>
                            {statusView}
                            {shopItemsView}
                        </div>
                    </div>
                </div>
            </div>
        </ContainerPage>
    );
};

SearchPage.getInitialProps = async ({ query }) => {
    return { query: query };
};

//export default SearchPage;
export default withAuth(SearchPage, AccessLevel.ALWAYS_ACCESS_LEVEL);
