import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import ContainerProductDetail from '~/components/layouts/ContainerProductDetail';
import ProductRepository from '~/repositories/ProductRepository';
import VendorRepository from '../../repositories/VendorRepository';

import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import ContainerPage from '~/components/layouts/ContainerPage';
import HeaderProduct from '~/components/shared/headers/HeaderProduct';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';

const ProductDefaultPage = ({ country }) => {
    const router = useRouter();
    const { pid } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getProduct(pid) {
        setLoading(true);
        const responseData = await ProductRepository.getProductsById(pid);
        if (responseData && !responseData?.error) {
            setProduct(responseData);
            var a = await JSON.stringify(
                await VendorRepository.getVendorById({
                    id_vendor: await responseData?.id_vendor,
                })
            );
            localStorage.setItem('vendor_public_details', a);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        } else {
            router.push('/');
        }
    }

    useEffect(() => {
        if (pid && !isNaN(pid)) {
            getProduct(pid);
        } else {
            router.push('/');
        }
    }, [pid]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
            url: '/shop',
        },
        {
            text: product ? product.product_title : 'Loading...',
        },
    ];
    // Views
    let productView, headerView;
    if (!loading) {
        if (product) {
            productView = <ProductDetailFullwidth product={product} />;
            //headerView = <HeaderProduct product={product} />;
        } else {
            //headerView = <HeaderDefault />;
        }
    } else {
        productView = <SkeletonProductDetail />;
    }
    return (
        <ContainerPage title={product ? product.product_title : 'Loading...'}>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <div className="ps-page--product">
                <div className="ps-container">
                    <div className="ps-page__container">
                        <div className="ps-page__left">{productView}</div>
                        <div className="ps-page__right">
                            {/* <ProductWidgets product={product} /> */}
                            {loading ? (
                                <SkeletonProductDetail />
                            ) : (
                                <ProductWidgets product={product} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ContainerPage>
    );
    /*
        return (
            <ContainerPage title={product ? product.product_title : 'Loading...'}>
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div className="ps-page--product">
                    <div className="ps-container">
                        <div className="ps-page__container">
                            <div className="ps-page__left">{productView}</div>
                            <div className="ps-page__right">
                                <ProductWidgets product={product}/>
                            </div>
                        </div>
      <CustomerBought
                        layout="fullwidth"
                        collectionSlug="deal-of-the-day"
                    />
                    <RelatedProduct collectionSlug="shop-recommend-items" />
                    </div>
                </div>
            </ContainerPage>
        );*/
};

//export default ProductDefaultPage;
export default withAuth(ProductDefaultPage, AccessLevel.ALWAYS_ACCESS_LEVEL);
/*




*/
