import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import ProductRepository from '~/repositories/ProductRepository';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import ContainerPage from '~/components/layouts/ContainerPage';
import Product from '~/components/elements/products/Product';
import ProductGroupGridItems from '~/components/partials/product/ProductGroupGridItems';
import ProductDetailCountdown from '~/components/elements/detail/ProductDetailCountdown';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';

const AllProducts = () => {
    const router = useRouter();
    const { pid } = router.query;
    const [pageSize] = useState(100);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getProducts() {
        setLoading(true);
        const responseData = await ProductRepository.getProducts();

        if (responseData) {
            setProduct(responseData);

            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
            url: '/shop',
        },
    ];
    // Views
    let shopItemsView, statusView;
    if (!loading) {
        if (product) {
            shopItemsView = (
                <ProductGroupGridItems columns={6} pageSize={pageSize} />
            );
            if (product.items.length > 0) {
                const items = product.items.map((item) => {
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
                            {product.totalItems}
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
                <span className="ps-form__action">
                    <Spin size="large" />
                </span>
            )
    }

    return (
        <ContainerPage title={`All Products`} boxed={true}>
            <div className="ps-page">
                <BreadCrumb breacrumb={breadCrumb} />
            </div>
            <div className="container">
                <div className="ps-shop ps-shop--search">
                    <div className="container">
                        <div className="ps-shop__header">
                            <h1>All Products</h1>
                        </div>
                        <div className="ps-shop__content">
                            {statusView}
                            {shopItemsView}
                        </div>
                    </div>
                </div>
            </div>
        </ContainerPage>
    );
};

//export default ProductDefaultCountdown;
export default withAuth(AllProducts, AccessLevel.ALWAYS_ACCESS_LEVEL);
