import React from 'react';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from './../../utilities/constant-class';

const ThanksPage = () => {
    return (
        <ContainerPage title="Thanks" boxed={true}>
            <div className="ps-page--single">
                <img src="/static/img/ads/thank-you.jpg" alt="" width="100%"/>
            </div>
        </ContainerPage>
    );
};
export default withAuth(ThanksPage, AccessLevel.ALWAYS_ACCESS_LEVEL);

//  export default WithAuth((AboutUsPage[1,2]));
