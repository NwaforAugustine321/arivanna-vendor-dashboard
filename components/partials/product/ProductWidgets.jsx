import React, { useCallback } from 'react';
import WidgetProductFeatures from '~/components/shared/widgets/WidgetProductFeatures';
import WidgetSaleOnSite from '~/components/shared/widgets/WidgetSaleOnSite';
import WidgetProductSameBrands from '~/components/shared/widgets/WidgetProductSameBrands';
import WidgetShopAds from '~/components/shared/widgets/WidgetShopAds';
import { connect } from 'react-redux';
import {checkIfShippingAvailableForLocation} from '~/utilities/product-helper.js';

const ProductWidgets = ({ product, country }) => {

    return (
        <section>
            <WidgetProductFeatures
                isShippingAvailable={checkIfShippingAvailableForLocation(product)}
            />
            <WidgetSaleOnSite />
        </section>
    );
};

export default connect((state) => ({ country: state.setting.country }))(
    ProductWidgets
);


/*

const ProductWidgets = ({ product, country }) => {
    return (
        <section>
            <WidgetProductFeatures isShippingAvailable={checkIfShippingAvailableForLocation(product)}/>
            <WidgetSaleOnSite />
            <WidgetShopAds />
            <WidgetProductSameBrands collectionSlug="shop-same-brand" />
        </section>
    );
};

export default connect((state) => ({ country: state.setting.country }))(
    ProductWidgets
);


*/