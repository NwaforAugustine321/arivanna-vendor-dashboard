import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { useRouter } from 'next/router';

const WidgetShopCategories = () => {
    const Router = useRouter();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug, page } = Router.query;

    useEffect(() => {
        let mounted = true;
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
            })
    }, [1]);

    // Views
    let categoriesView;
    if (!loading) {
        if (categories && categories.length > 0) {
            const items = categories.map((item) => (
        
                <li
                    key={item.id_product_category}
                    className={item.category_name === slug ? 'active' : ''}>
                    <Link href={`/shop?category=${item.id_product_category}&name=${item.category_name}&page=1`}>
                        {item.category_name}
                    </Link>
                </li>
            ));
            categoriesView = <ul className="ps-list--categories">{items}</ul>;
        } else {
        }
    } else {
        categoriesView = <p>Loading...</p>;
    }

    return (
        <aside className="widget widget_shop">
            <h4 className="widget-title">Categories</h4>
            {categoriesView}
        </aside>
    );
};

export default WidgetShopCategories;
