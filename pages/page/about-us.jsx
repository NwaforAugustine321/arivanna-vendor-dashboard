import React, { useEffect, useState } from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import OurTeam from '~/components/partials/page/about-us/OurTeam';
import AboutAwards from '~/components/partials/page/about-us/AboutAwards';
import StoreDefault from '~/components/elements/stores/StoreDefault';
import StoreRepository from '~/repositories/StoreRepository';
import ContainerPage from '~/components/layouts/ContainerPage';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import AboutUsRepository from '~/repositories/AboutUsRepository';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from './../../utilities/constant-class';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';

const AboutUsPage = () => {
    const [aboutUs, setAboutUs] = useState(null);
    const [loading, setLoading] = useState(false);
    const [stores, setStores] = useState([]);

    async function getAboutUs() {
        setLoading(true);
        const responseData = await AboutUsRepository.getAboutUs();
        if (responseData) {
            setAboutUs(responseData);

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

    async function getStores() {
        const responseData = await StoreRepository.getStores();

        if (responseData) {
            setStores(responseData.sort((a, b) => {return new Date(b.created_at) - new Date(a.created_at);}).slice(0,5)); // latest 5 based on time 
        }
    }


    useEffect(() => {
        getAboutUs();
        getStores();
    }, []);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'About Us',
        },
    ];
    let productItemView;
    const skeletons = generateTempArray(6).map((item) => (
        <div className="col-xl-2 col-lg-3 col-sm-3 col-6 mt-5" key={item}>
            <SkeletonProduct />
        </div>
    ));
    productItemView = <div className="row">{skeletons}</div>;
    return (
        <ContainerPage title="About Us" boxed={true}>
            <div className="ps-page--single">
                <img src="/static/img/bg/about-us.jpg" alt="" />
                <BreadCrumb breacrumb={breadCrumb} />
                {loading ? 
                    productItemView
                 : (
                    // <span className="ps-form__action ant-spin-container">
                    //     <Spin size="large" />
                    // </span>
                    <OurTeam info={aboutUs} />
                )}
                <AboutAwards />
                {/* <div className="container">
                    <div className="ps-section__header">
                        <h3>Top Vendors</h3>
                        <div className="ps-stores-items row">

                            {stores.length !== 0 &&
                                stores
                                    .sort((a, b) =>
                                        a.business_name.toUpperCase() >
                                            b.business_name.toUpperCase()
                                            ? 1
                                            : -1
                                    )
                                    .map((item) => (
                                        <div
                                            style={{marginBottom: "20px"}}
                                            className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 "
                                            key={item.id_vendor}>
                                            <StoreDefault source={item} />
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </div> */}
            </div>
        </ContainerPage>
    );
};
export default withAuth(AboutUsPage, AccessLevel.ALWAYS_ACCESS_LEVEL);

//  export default WithAuth((AboutUsPage[1,2]));
