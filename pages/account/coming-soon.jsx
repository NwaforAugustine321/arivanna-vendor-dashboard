import React from 'react';
import Link from 'next/link';

import ContainerPage from '~/components/layouts/ContainerPage';

const comingPage = () => {



    
    return (
        <ContainerPage title="Login" boxed={true}>
            <div className="ps-page--coming">
                <div className="containerpage">
                    <h3 className="ps-page--my-accoun">COMING SOON</h3>

                    <p>
                        <Link href="/">
                            <a className="ps-btn">Homepage</a>
                        </Link>
                    </p>
                </div>
            </div>
        </ContainerPage>
    );
};

export default comingPage;
