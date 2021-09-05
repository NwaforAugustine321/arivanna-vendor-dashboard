import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';
import ProductHorizontal from '~/components/elements/products/ProductHorizontal';
import ProductRepository from '~/repositories/ProductRepository';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { Spin } from 'antd';

const NewArrivals = ({ collectionSlug }) => {
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getProducts(collectionSlug) {
        setLoading(true);
        const responseData = await ProductRepository.getProductsNewArrival(12);

        if (responseData) {
            setProductItems(responseData);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        getProducts();
    }, [1]);

    // Views
    let productItemView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            productItemView = productItems.map((item) => (
                <div
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6"
                    // className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 "
                    key={item.id_product_m2m_vendor}>
                    <ProductHorizontal product={item} />
                </div>
            ));
        } else {
            productItemView = <p>No products found.</p>;
        }
    } else {
        const skeletons = generateTempArray(6).map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemView = <div className="row">{skeletons}</div>;
        // productItemView = <Spin />;
    }
    return (
        <div className="ps-product-list ps-new-arrivals mt-0">
            <div className="ps-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ps-section__header">
                            <h3>Hot New Arrivals</h3>
                            <ul className="ps-section__links">
                                <li>
                                    <Link href="/shop">
                                        <a>View All</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="ps-section__content">
                            <div className="row">{productItemView}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;
