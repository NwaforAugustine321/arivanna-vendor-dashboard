import React, { useEffect, useState } from 'react';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import BreadCrumb from '~/components/elements/BreadCrumb';
import withAuth from '~/components/hoc/RouteAuth';
import Newletters from '~/components/partials/commons/Newletters';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import VendorStore from '~/components/partials/vendor/VendorStore';
import HeaderMobile from '~/components/shared/headers/HeaderMobile';
import NavigationList from '~/components/shared/navigation/NavigationList';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { AccessLevel } from '~/utilities/constant-class';
import { useRouter } from 'next/router';
import StoreRepository from '~/repositories/StoreRepository';

const VendorStorePage = () => {
    const router = useRouter();
    const { vid } = router.query;
    const [vendor, setVendor] = useState({});
    const [vendorProducts, setVendorProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState(
        'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6'
    );

    async function getVendor(vid) {
        setLoading(true);
        var responseData = await StoreRepository.getStoreProducts(vid);
        if (responseData) {
            if (!responseData[0]) {
                responseData = await StoreRepository.get_single_store(vid);
            }
            setVendor(await responseData);
            setVendorProducts(await responseData);
        }
        await setLoading(false);
    }
    const skeletonItems = generateTempArray(3).map((item) => (
        <div className={classes} key={item}>
            <SkeletonProduct />
        </div>
    ));

    useEffect(() => {
        getVendor(vid);
    }, [vid]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Stores',
            url: '/stores',
        },
        {
            text: vendor && vendor.business_name ? `${vendor.business_name}` : 'Loading...',
        },
    ];


    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className="ps-page--single ps-page--vendor">
                <BreadCrumb breacrumb={breadCrumb} />
                {loading ?
                    <div className="row">{skeletonItems}</div>
                    :

                    <div>
                        <VendorStore
                            vendor={vendor}
                            vendorProducts={vendorProducts}
                        />
                    </div>
                }

            </div>
            <Newletters layout="container" />
            <FooterDefault />
        </div>
    );
};

//export default VendorStorePage;
export default withAuth(VendorStorePage, AccessLevel.ALWAYS_ACCESS_LEVEL);
