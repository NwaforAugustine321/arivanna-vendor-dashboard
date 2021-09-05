import React from 'react';
import { Switch } from 'antd';
import ContainerShop from '~/components/layouts/ContainerShop';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ShopItems from '~/components/partials/shop/ShopItems';
import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay';
import ProductGroupByCarousel from '~/components/partials/product/ProductGroupByCarousel';
import ShopCategories from '~/components/partials/shop/ShopCategories';
import ShopBrands from '~/components/partials/shop/ShopBrands';
import ShopBanner from '~/components/partials/shop/ShopBanner';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import WidgetShopSearchProduct from '~/components/shared/widgets/WidgetShopSearchProduct';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';
import { useRouter } from 'next/router';

const ShopDefaultPage = () => {
    const Router = useRouter();
    const [keyword, setKeyword] = React.useState('');
    const [disabledShipping, setDisabledShipping] = React.useState(true);
    const { query } = Router;
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: `${query?.name || 'All products'}`,
        },
    ];
    const HomepageDefaultPage = () => { HomeDefaultDealOfDay }

    const toggle = () => {
        setDisabledShipping(!disabledShipping);
    };

    return (
        <ContainerShop title="Shop">
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div className="ps-container mt-5">
                    {/* <ShopBrands /> */}
                    {/* <ShopCategories /> */}
                    <div className="ps-layout--shop">
                        <div className="ps-layout__left">
                            <WidgetShopCategories />
                            {/* <WidgetShopBrands /> */}
                            <WidgetShopSearchProduct setKeyword={setKeyword} />
                            <WidgetShopFilterByPriceRange />
                        </div>
                        <div className="ps-layout__right">
                            <ShopItems
                                searchValue={keyword}
                                columns={6}
                                pageSize={18}
                                disabledShipping={disabledShipping}
                            />
                            <HomeDefaultDealOfDay />
                            {/* <ProductGroupByCarousel
                                collectionSlug="shop-best-seller-items"
                                title="Best Sale Items"
                            /> */}
                            {/* <ProductGroupByCarousel
                                collectionSlug="shop-recommend-items"
                                title="Recommended Items"
                            /> */}
                            
                        </div>
                    </div>
                </div>
            </div>
        </ContainerShop>
    );
};
export default withAuth(ShopDefaultPage, AccessLevel.ALWAYS_ACCESS_LEVEL);
