import { useEffect, useState } from 'react';
import Link from 'next/link';

const HomeDefaultTopCategoriesListing = ({
    category: { category_image_url, category_name, id_product_category },
}) => {
    return (
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
            <div className="ps-block--category">
                {/* <Link href=>//{`/search?category=${id_category}`}> */}
                <Link
                    href={`shop?category=${id_product_category}&name=${category_name}&page=1`}>
                    <a className="ps-block__overlay"></a>
                </Link>

                {/* <img src={`/static/img/categories/${id}.jpg`} alt="martfury" /> */}
                <img
                    src={`${category_image_url}`}
                    alt="martfury"
                    width="100"
                    height="100"
                />
                <p>{category_name} </p>
            </div>
        </div>
    );
};

export default HomeDefaultTopCategoriesListing;
