import React from 'react';
import Login from '~/components/partials/account/Login';
import { connect } from 'react-redux';
import Error from '~/pages/page/page-404';
import LoginPage from '~/pages/account/login';
import { AccessLevel } from '~/utilities/constant-class';

const withAuth = (Component, accessLevelOfCurrentPage) => {
    /* assiging default accessLevelOfCurrentPage=3*/
    const Auth = (props) => {
        /* get the user information from the localstorage and compare with the  access
      levels of the current page 
      dev-1, buyer-2, public-3*/

        //  const storeObject=(JSON.parse(localStorage.getItem("persist:martfury")));
        //  const isLoggedIn=(JSON.parse(storeObject.auth).isLoggedIn);
        //  //const userName = (JSON.parse(storeObject.auth).userName);
        //  const token = (JSON.parse(storeObject.auth).token);
        //  const accessLevelOfUser=(JSON.parse(storeObject.auth).accessLevel);
        const isLoggedIn = props.auth.isLoggedIn;
        const userName = props.auth.userName;
        const token = props.auth.token;
        const accessLevelOfUser = props.auth.accessLevel || [];
        //always accessible to all users
        //before logging
        if (!isLoggedIn) {
            //|| !token) {

            if (
                accessLevelOfCurrentPage === AccessLevel.PUBLIC_ACCESS_LEVEL ||
                accessLevelOfCurrentPage === AccessLevel.ALWAYS_ACCESS_LEVEL
            ) {
                return <Component {...props} />;
            } else {
                return <LoginPage />;
            }
        }
        //after loggin
        if (isLoggedIn) {
            // && token) {
            //return <LoginPage />;
            /* if the user tries to register or login again show no access other wise redirect to requested page*/
            if (accessLevelOfUser.includes(accessLevelOfCurrentPage)) {
                if (
                    accessLevelOfCurrentPage === AccessLevel.PUBLIC_ACCESS_LEVEL
                ) {
                    return <Error error="401" />;
                } else {
                    // if (
                    //     accessLevelOfCurrentPage.includes(
                    //         AccessLevel.DEV_ACCESS_LEVEL
                    //     ) ||
                    //     accessLevelOfCurrentPage.includes(
                    //         AccessLevel.USER_VENDOR_TM_LEVEL
                    //     ) ||
                    //     accessLevelOfCurrentPage.includes(
                    //         AccessLevel.USER_BUYER_ACCESS_LEVEL
                    //     ) ||
                    //     accessLevelOfCurrentPage.includes(
                    //         AccessLevel.USER_ACCESS_LEVEL
                    //     )
                    // )
                    //{
                    return <Component {...props} />;
                }
            } else {
                return <Error error="401" />;
            }
            //return <Component {...props} />;
            // }
        }
    };

    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }
    const mapStateToProps = (state) => {
        return {
            auth: state.auth,
        };
    };

    return connect(mapStateToProps)(Auth);
};

export default withAuth;
