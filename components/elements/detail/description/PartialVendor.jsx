import VendorRepository from '../../../../repositories/VendorRepository'
import React, { useEffect, useRef, useState } from 'react';

const PartialVendor = (product) => {
    JSON.parse(localStorage.getItem("vendor_public_details"))


    return (
        <section>
            <h4>{JSON.parse(localStorage.getItem("vendor_public_details"))
                ?.business_name}</h4>
            <p>
                {JSON.parse(localStorage.getItem("vendor_public_details"))?.vendor_short_desc}
            </p>
            <a href={`/stores/${JSON.parse(localStorage.getItem("vendor_public_details"))?.id_vendor}`}>More Products from {JSON.parse(localStorage.getItem("vendor_public_details"))?.business_name}</a>
        </section>
    );
}

export default PartialVendor;
