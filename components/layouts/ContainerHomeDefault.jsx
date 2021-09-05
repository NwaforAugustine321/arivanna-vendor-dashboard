import React from 'react';
import Head from 'next/head';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import HeaderMobile from '~/components/shared/headers/HeaderMobile';
import NavigationList from '~/components/shared/navigation/NavigationList';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchWishList } from '../../store/wishlist/action';

const ContainerHomeDefault = ({ children, title, auth }) => {
    const dispatch = useDispatch();

    let titleView;
    if (title !== null) {
        titleView = process.env.title + ' | ' + title;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }

    useEffect(() => {
        if (auth?.isLoggedIn) {
            fetchWishList(auth)(dispatch);
        }
    }, [auth]);

    return (
        <div className="martfury">
            <Head>
                <title>{titleView}</title>
            </Head>
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <main id="homepage-1">{children}</main>
            <FooterFullwidth />
            {/*<SwicherDemo />
            <SubscribePopup active={subscribe} />*/}
        </div>
    );
};

export default connect((state) => ({auth: state.auth}))(ContainerHomeDefault);
