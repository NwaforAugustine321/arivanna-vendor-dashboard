import React, { useState, useEffect, useCallback } from 'react';
import { Slider, Checkbox, Spin } from 'antd';
import { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';
import { formatCurrency } from '~/utilities/product-helper';
import { connect } from 'react-redux';

const WidgetShopFilterByPriceRange = ({currency}) => {
    const Router = useRouter();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [p2v, setP2v] = useState([]);
    const { page, category, name } = Router.query;

    const getMaxProductsData = useCallback(async () => {
        const products = await ProductRepository.getProducts();

        // Get p2v_price
        const p2v_prices = products.items.map((item) => {
            return item.p2v_price;
        });

        // set p2v prices
        setP2v(p2v_prices);
    }, []);

    useEffect(() => {
        getMaxProductsData();
    }, [getMaxProductsData]);

    function handleChangeRange(value) {
        setMin(value[0]);
        price_lt: value[1], setMax(value[1]);
        /*  const params = {
            price_gt: value[0],
        };*/
        if (category)
            Router.push(
                `/shop?category=${category}&name=${name}&page=${page}&price_gt=${value[0]}&price_lt=${value[1]}`
            );
        else
            Router.push(
                `/shop?page=${page}&price_gt=${value[0]}&price_lt=${value[1]}`
            );

        /*this.props.dispatch(getProductsByPrice(params));*/
    }

    // Get the max value
    let priceMax = p2v.reduce((a, b) => {
        return Math.max(a, b);
    }, 0);

    useEffect(() => {
        setMax(priceMax);
    }, [priceMax]);


    return (
        <aside className="widget widget_shop">
            <figure>
                <h4 className="widget-title">By Price</h4>
                {priceMax ? (
                    <Slider
                        range
                        max={priceMax}
                        defaultValue={[0, priceMax]}
                        onAfterChange={(e) => handleChangeRange(e)}
                        tipFormatter={val => (`${currency.symbol} ${( val ? formatCurrency(val, currency, 0) : 0)}`)}
                    />
                ) : (
                    <Spin />
                )}

                <p>
                    Price: {currency.symbol}{min ? formatCurrency(min, currency, 0) : 0} - {currency.symbol}{formatCurrency(max, currency, 0)}
                </p>
            </figure>
        </aside>
    );
};

export default connect(state => state.setting)(WidgetShopFilterByPriceRange);
