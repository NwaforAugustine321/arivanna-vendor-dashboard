import React, { useEffect } from 'react';
import SiteFeatures from '~/components/partials/homepage/home-default/SiteFeatures';
import HomeAdsColumns from '~/components/partials/homepage/home-default/HomeAdsColumns';
import HomeAds from '~/components/partials/homepage/home-default/HomeAds';
import NewArrivals from '~/components/partials/homepage/home-default/NewArrivals';
import Newsletters from '~/components/partials/commons/Newletters';
import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay';
import HomeDefaultTopCategories from '~/components/partials/homepage/home-default/HomeDefaultTopCategories';
import ContainerHomeDefault from '~/components/layouts/ContainerHomeDefault';
import HomeDefaultProductListing from '~/components/partials/homepage/home-default/HomeDefaultProductListing';
import HomeDefaultBanner from '~/components/partials/homepage/home-default/HomeDefaultBanner';

const HomepageDefaultPage = () => {
    return (
        <ContainerHomeDefault title="Arivanna">
            <SiteFeatures />
            <NewArrivals />
            <HomeDefaultDealOfDay />
            <HomeDefaultTopCategories />
            {/* <HomeDefaultProductListing
                collectionSlug="consumer-electronics"
                title="Consumer Electronics"
            /> */}
            <Newsletters />
        </ContainerHomeDefault>
    );
};

export default HomepageDefaultPage;
