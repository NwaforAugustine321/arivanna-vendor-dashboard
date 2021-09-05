import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import VendorRepository from '../../../../repositories/VendorRepository'
const ModuleProductDetailDescription = ({ product }) => {
    return (
        <div className="ps-product__desc">
            <p>
                Sold By:
                <Link href={`/stores/${JSON.parse(localStorage.getItem("vendor_public_details"))?.id_vendor}`}>
                    <a>
                        <strong> {JSON.parse(localStorage.getItem("vendor_public_details"))?.business_name}</strong>
                    </a>
                </Link>
            </p>
            <div>
                {product?.product_desc_short}
            </div>
        </div>
    );
}

export default ModuleProductDetailDescription;
