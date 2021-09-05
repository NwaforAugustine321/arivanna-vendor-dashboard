import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductRepository from '~/repositories/ProductRepository';
import HomeDefaultTopCategoriesListing from '~/components/partials/homepage/home-default/HomeDefaultTopCategoriesListing';

const HomeDefaultTopCategories = () => {
    const [caterogies, setCategories] = useState('');

    useEffect(() => {
        const response = ProductRepository.getProductCategories()
            .then((_response) => {
                _response
                    ? setCategories(_response) //console.log(_response) //
                    : console.log('no categories found');
            })
            .catch((error) => console.error());
    }, []);
    return (
        <div className="ps-top-categories">
            <div className="ps-container">
                {/* <div className="ps-section__header"> */}
                <h3>categories </h3>
                {/* </div> */}
                {caterogies.length > 0 ? (
                    <div className="row">
                        {caterogies.map((_category, index) => {
                            return (
                                <HomeDefaultTopCategoriesListing
                                    category={_category.category_name}
                                    id_category={_category.id_product_category}
                                    // category={_category.category_name}
                                    // id_category={_category.id_product_category}
                                    category={_category}
                                    key={_category.id_product_category}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div>No categories found</div>
                )}
            </div>
        </div>
    );
};
export default HomeDefaultTopCategories;
