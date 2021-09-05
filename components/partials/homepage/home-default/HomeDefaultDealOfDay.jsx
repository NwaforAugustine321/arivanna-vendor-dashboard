import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { carouselFullwidth } from '~/utilities/carousel-helpers';
import CountDownSimple from '~/components/elements/CountDownSimple';
import ProductDealOfDay from '~/components/elements/products/ProductDealOfDay';
import { generateTempArray } from '~/utilities/common-helpers';
import ProductRepository from '~/repositories/ProductRepository';
import Adverts from '~/components/partials/homepage/home-default/Advert';

const HomeDefaultDealOfDay = ({ collectionSlug }) => {
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getProducts() {
        setLoading(true);
        const responseData = await ProductRepository.getProductsDealOfTheDay(
            12
        );

        if (responseData) {
            console.log("this is the deal", responseData)
            setProductItems(responseData);
            // setProductItems(responseData.sort((a, b) => {return new Date(b.created_at) - new Date(a.created_at);}).slice(0,4));
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
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            const slideItems = productItems.sort((a, b) =>
                                    a.business_name.toUpperCase() >
                                        b.business_name.toUpperCase()
                                        ? 1
                                        : -1
                                ).map((item) => (
                                    <ProductDealOfDay product={item} key={item.id_product_m2m_vendor} />
                                    // <div
                                    //     className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6" key={item.id_product_m2m_vendor}>
                                    //     <ProductDealOfDay
                                    //         product={item}
                                    //     />
                                    // </div>
                                ));
            productItemsView = (
                <Slider {...carouselFullwidth} className="ps-carousel outside">
                    {slideItems}
                </Slider>
            );
        } else {
            productItemsView = <p>No product(s) found.</p>;
        }
    } else {
        const skeletons = generateTempArray(6).map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletons}</div>;
    }

    return (
        <div className="ps-deal-of-day mb-5">
            <div className="ps-container">
                <div className="ps-section__header">
                    <div className="ps-block--countdown-deal">
                        <div className="ps-block__left">
                            <h3>Deal of the day</h3>
                        </div>
                        {/* <div className="ps-block__right">
                                <figure>
                                    <figcaption>End in:</figcaption>
                                    <CountDownSimple
                                        timeTillDate="12 31 2021, 6:00 am"
                                        timeFormat="MM DD YYYY, h:mm a"
                                    />
                                </figure>
                        </div> */}


                    </div>
                    <Link href="/shop">
                        <a>View all</a>
                    </Link>
                </div>
                <div className="ps-section__content">{productItemsView}</div>
                {/* <div className="ps-section__content">
                    <div className="row">{productItemsView}</div>
                </div> */}
            </div>
        </div>
    );
};

export default HomeDefaultDealOfDay;
