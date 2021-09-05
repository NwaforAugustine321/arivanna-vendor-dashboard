import React from 'react';
import Rating from '~/components/elements/Rating';
import Link from 'next/link';

const StoreDefault = ({ source }) => {
    return (
        <article className="ps-block--store-2">
            <div
                className="ps-block__content bg--cover"
                style={{
                    background: `url('/static/img/vendor/store/default-store-banner.png')`,
                }}>
                <figure>
                    <h4>
                        <Link
                            href="/stores/[vid]"
                            as={`/stores/${source.id_vendor}`}>
                            <a>{source.business_name}</a>
                        </Link>
                    </h4>

                    <div hidden className="ps-block__rating">
                        <Rating />
                    </div>
                    {source.vendor_long_desc && (
                        <p>
                            <i className="fa fa-sticky-note"></i>{' '}
                            {source.vendor_long_desc}
                        </p>
                    )}
                    {source.vendor_short_desc && (
                        <p>
                            <i className="fa fa-info-circle"></i>{' '}
                            {source.vendor_short_desc}
                        </p>
                    )}
                 
                </figure>
            </div>
            <div className="ps-block__author">
                <a className="ps-block__user" href="#">
                    <img
                        src="/static/img/vendor/store/vendor-150x150.jpg"
                        alt="martfury"
                    />
                </a>
                <Link href="/stores/[vid]" as={`/stores/${source.id_vendor}`}>
                    <a className="ps-btn">Visit Store</a>
                </Link>
            </div>
        </article>
    );
};

export default StoreDefault;


/* DO NOT USE THE BELOW
   {source.vendor_address && <p>{source.vendor_address}</p>}
                    {source.vendor_address && (
                        <p>
                            <i class="fa fa-phone" aria-hidden="true"></i>{' '}
                            {source.vendor_phone_number}
                        </p>
                    )}


*/