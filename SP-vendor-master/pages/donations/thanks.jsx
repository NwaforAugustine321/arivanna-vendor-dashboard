import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';

const ThanksPage = () => {
    return (
        <ContainerDefault title="Thanks" boxed={true}>
            <div className="ps-page--single">
                <img src="/img/donation/thank-you.jpg" alt="" width="100%"/>
            </div>
        </ContainerDefault>
    );
};
export default ThanksPage;
