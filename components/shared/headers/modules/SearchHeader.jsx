import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Spin } from 'antd';
import ProductRepository from '~/repositories/ProductRepository';
import CollectionRepository from '~/repositories/CollectionRepository';
import ProductSearchResult from '~/components/elements/products/ProductSearchResult';

let exampleCategories = [];

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const SearchHeader = () => {
    const inputEl = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [idCategory, setIdCategory] = useState(1);
    const [resultItems, setResultItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([
        { id_product_category: 1, category_name: 'All' },
    ]);
    const debouncedSearchTerm = useDebounce(keyword, 300);

    function handleClearKeyword() {
        setKeyword('');
        setIsSearch(false);
        setLoading(false);
    }

    function closeSearchComponent() {
        setIsSearch(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (keyword) {
            Router.push(`/search?category=${idCategory}&keyword=${keyword}`);
        }
        if (idCategory > 1 && !keyword) {
            //get all product from selected category
            Router.push(`/search?category=${idCategory}`);
        }
        if (idCategory <= 1 && !keyword) {
            //get all products from all categories
            Router.push(`/search`);
        }
    }

    // function useAsync(asyncFn, onSuccess) {

    let mounted = useRef(false)
    useEffect(() => {
         mounted = true;
        const response = ProductRepository.getProductCategories();
        response.then((categories) => {
            const check = categories[0]?.id_product_category;
            if (check && mounted) {
                setCategories(categories);
            }

            if (categories.error) {
                console.log('SERVER DOWN');
            }

            return function cleanup() {
                mounted = false;
            };
        });
    }, []); //, [asyncFn, onSuccess]);
    // }

    useEffect(() => {
         mounted = true;
        if (debouncedSearchTerm) {
            setLoading(true);
            if (keyword) {
                const products = ProductRepository.getRecords(
                    idCategory,
                    keyword
                );

                products.then((result) => {
                    if (mounted) setLoading(false);
                    setResultItems(result.data);
                    setIsSearch(true);
                });
            } else {
                setIsSearch(false);
                setKeyword('');
            }

            if (loading) {
                setIsSearch(false);
            }
        } else {
            setLoading(false);
            setIsSearch(false);
        }
        return function cleanup() {
            mounted = false;
        };
    }, [debouncedSearchTerm]);

    // Views
    let productItemsView,
        clearTextView,
        selectOptionView,
        loadingView,
        loadMoreView;
    if (!loading) {
        if (resultItems && resultItems.length > 0) {
            if (resultItems.length > 5) {
                loadMoreView = (
                    <div className="ps-panel__footer text-center">
                        <Link href="/search">
                            <a>See all results</a>
                        </Link>
                    </div>
                );
            }
            productItemsView = resultItems.map((product) => {
                return (
                    <ProductSearchResult
                        product={product}
                        key={product.id_product_m2m_vendor}
                    />
                );
            });
        } else {
            productItemsView = <p>No product found.</p>;
        }
        if (keyword !== '') {
            clearTextView = (
                <span className="ps-form__action" onClick={handleClearKeyword}>
                    <i className="icon icon-cross2"></i>
                </span>
            );
        }
    } else {
        loadingView = (
            <span className="ps-form__action">
                <Spin size="small" />
            </span>
        );
    }

    selectOptionView = categories.map((option) => (
        <option
            value={option.id_product_category}
            key={option.id_product_category}>
            {option.category_name}
        </option>
    ));

    return (
        <form
            className="ps-form--quick-search"
            method="get"
            action="/"
            onSubmit={handleSubmit}>
            <div
                style={{
                    borderTopLeftRadius: '5px',
                    borderBottomLeftRadius: '5px',
                }}
                className="ps-form__categories">
                <select
                    // id="category-dropdown-1"
                    className="form-control"
                    onChange={(e) => setIdCategory(e.target.value)}>
                    {selectOptionView}
                </select>
            </div>

            <div className="ps-form__input">
                <input
                    // id="search-bar-l"
                    onBlur={closeSearchComponent}
                    ref={inputEl}
                    className="form-control"
                    type="text"
                    value={keyword}
                    placeholder="I'm shopping for..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                {clearTextView}
                {loadingView}
            </div>
            <button onClick={handleSubmit}>Search</button>
            <div
                className={`ps-panel--search-result${
                    isSearch ? ' active ' : ''
                }`}>
                <div className="ps-panel__content">{productItemsView}</div>
                {loadMoreView}
            </div>
        </form>
    );
};

export default SearchHeader;
