import React, { useEffect, useCallback, useState } from 'react';
import ProductWide from '../../../elements/products/ProductWide';
import Product from '../../../elements/products/Product';
import ProductOffline from '../../../elements/products/ProductOffline';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';
import StoreRepository from '~/repositories/StoreRepository';
import { useRouter } from 'next/router';

const VendorProducts = ({vendorProducts}) => {
    const [listView, setListView] = useState(true);

    const router = useRouter();

    const handleChangeViewMode = useCallback(
        (view, event) => {
            event.preventDefault();
            setListView(view === 'grid');
        },
        [setListView]
    );

    const viewMode = listView;

    return (
        <div className="ps-shopping vendor-shop">
            <div className="ps-shopping__header">
                <p>
                    <strong>
                        {' '}
                        {vendorProducts && vendorProducts.length ? vendorProducts.length : 0}
                    </strong>{' '}
                    Products found
                </p>
                <div className="ps-shopping__actions">
                    <select className="ps-select" data-placeholder="Sort Items">
                        <option>Sort by latest</option>
                        <option>Sort by popularity</option>
                        <option>Sort by average rating</option>
                        <option>Sort by price: low to high</option>
                        <option>Sort by price: high to low</option>
                    </select>
                    <div className="ps-shopping__view">
                        <p>View</p>
                        <ul className="ps-tab-list">
                            <li className={viewMode === true ? 'active' : ''}>
                                <a
                                    href="#"
                                    onClick={handleChangeViewMode.bind(
                                        null,
                                        'grid'
                                    )}>
                                    <i className="icon-grid"></i>
                                </a>
                            </li>
                            <li className={viewMode !== true ? 'active' : ''}>
                                <a
                                    href="#"
                                    onClick={handleChangeViewMode.bind(
                                        null,
                                        'list'
                                    )}>
                                    <i className="icon-list4"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="ps-shopping__content">
                {viewMode === true ? (
                    <div className="ps-shopping-product">
                        <div className="row">
                            {vendorProducts && vendorProducts.length > 0
                                ? vendorProducts.map((product) => (
                                      <div
                                          className="col-lg-3 col-md-4 col-sm-6 col-6 "
                                          key={product.id_product_m2m_vendor}>
                                          <Product product={product} />
                                      </div>
                                  ))
                                : ''}
                        </div>
                    </div>
                ) : (
                    <div className="ps-shopping-product">
                        {vendorProducts && vendorProducts.length > 0
                            ? vendorProducts.map((product) => (
                                  <ProductWide
                                      product={product}
                                      key={product.id_product_m2m_vendor}
                                  />
                              ))
                            : ''}
                    </div>
                )}
            </div>
        </div>
    );
};

// export default VendorProducts;
export default withAuth(VendorProducts, AccessLevel.ALWAYS_ACCESS_LEVEL);
