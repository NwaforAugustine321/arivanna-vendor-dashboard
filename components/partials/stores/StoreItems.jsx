import React, { useEffect, useState } from 'react';
import { getStoresHelper } from '~/utilities/store-helpers';
import StoreDefault from '~/components/elements/stores/StoreDefault';
import { Spin } from 'antd';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';

const StoreItems = (props) => {
    const [loading, setLoading] = useState(false);
    const [stores, setStores] = useState(null);

    async function getStores() {
        setLoading(true);
        const responseData = await getStoresHelper();
        if (responseData) {
            setLoading(false);
            if (responseData.length > 0) {
                setStores(responseData);
            }
        }
    }

    useEffect(() => {
        getStores();
    }, []);

    let productItemView;
    const skeletons = generateTempArray(6).map((item) => (
        <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
            <SkeletonProduct />
        </div>
    ));
    productItemView = <div className="row">{skeletons}</div>;

    return (
        <div className="ps-stores-items row">
            {loading ? (
                <div>
                    {productItemView}
                    {/* <Spin /> Loading... */}
                </div>
            ) : stores ? (
                !props.store ? (
                    stores
                ) : (
                    props.store
                        .sort((a, b) =>
                            a.business_name.toUpperCase() >
                            b.business_name.toUpperCase()
                                ? 1
                                : -1
                        )
                        .map((item) => (
                            <div
                                className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 "
                                key={item.id_vendor}>
                                <StoreDefault source={item} />
                            </div>
                        ))
                )
            ) : (
                <p>No store found.</p>
            )}
        </div>
    );
};

export default StoreItems;
