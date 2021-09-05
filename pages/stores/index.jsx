import React, { useState, useEffect } from 'react';

import ContainerPage from '~/components/layouts/ContainerPage';
import StoreItems from '~/components/partials/stores/StoreItems';
import BreadCrumb from '~/components/elements/BreadCrumb';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';
import StoreRepository from '~/repositories/StoreRepository';

const StoreListPage = () => {
    const [storeSearch, setStoreSearch] = useState([]);
    const [stores, setStores] = useState([]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Stores',
        },
    ];

    async function getStores() {
        const responseData = await StoreRepository.getStores();
        if (responseData) {
            setStoreSearch(responseData);
            setStores(responseData);
        }
    }

    useEffect(() => {
        getStores();
    }, []);

    const handleSearch = (data) => {
        let search_data = data.toLowerCase();
        let matchStore = stores.filter((store) => {
            let is_match = store.business_name
                .toLowerCase()
                .includes(search_data);
            return is_match;
        });
        setStoreSearch(matchStore);
    };

    const handleChange = (e) => {
        handleSearch(e.target.value);
    };
    return (
        <ContainerPage title="Store list" boxed={true}>
            <div className="ps-page--single ps-page--vendor">
                <BreadCrumb breacrumb={breadCrumb} />
                <section className="ps-store-list">
                    <div className="container">
                        <div className="ps-section__header">
                            <h3>Store list</h3>
                        </div>
                        <div className="ps-section__content">
                            <div className="ps-section__search row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <button>
                                            <i className="icon-magnifier"></i>
                                        </button>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Search vendor..."
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <StoreItems store={storeSearch} />
                        </div>
                    </div>
                </section>
            </div>
        </ContainerPage>
    );
};

//export default StoreListPage;
export default withAuth(StoreListPage, AccessLevel.ALWAYS_ACCESS_LEVEL);
