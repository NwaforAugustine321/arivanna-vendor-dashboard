import React from 'react';
import { SortingMethods } from '~/utilities/constant-class';

const ModuleShopSortBy = ({sort = null, onUpdateSorting}) => {
    return (
        <select
            value={sort} onChange={onUpdateSorting}
            className="ps-select form-control"
            data-placeholder="Sort Items">
            <option value={SortingMethods.LATEST}>Sort by latest</option>
            <option value={SortingMethods.POPULARITY}>Sort by popularity</option>
            <option value={SortingMethods.RATING}>Sort by average rating</option>
            <option value={SortingMethods.PRICELH}>Sort by price: low to high</option>
            <option value={SortingMethods.PRICEHL}>Sort by price: high to low</option>
        </select>
    );
};

export default ModuleShopSortBy;
