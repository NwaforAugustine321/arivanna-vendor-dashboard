import React, { Component } from 'react';
import { notification } from 'antd';
import { connect } from 'react-redux';
import Link from 'next/link';
import { changeCurrency } from '../../../../store/setting/action';
import { useState } from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import ProductRepository from '../../../../repositories/ProductRepository';

const currencies = [
    {
        symbol: '$',
        currencyCode: 'AUD',
    },
    {
        symbol: '₹',
        currencyCode: 'INR',
    }
];

const CurrencyDropdown = ({ currency }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);

    const toggleCurrencyPopup = useCallback(() => {
        setOpen((open) => !open);
    }, [setOpen]);

    const renderCurrency = () => {
        return currencies.map((type) => (
            <li key={type.currencyCode}>
                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        handleChangeCurrency(e, {
                            symbol: type.symbol,
                            text: type.currencyCode,
                        });
                        toggleCurrencyPopup();
                    }}>
                    {type.symbol} {type.currencyCode}
                </a>
            </li>
        ));
    };

    const handleChangeCurrency = async (e, currency) => {
        e.preventDefault();

        setLoading(true);

        const result = await ProductRepository.getExchangeRatesLatest(
            currency.text
        );

        if (result) {
            dispatch(
                changeCurrency({ ...currency, rating: result.conversion_rate })
            );
        }
        setLoading(null);
    };

    return (
        <div className="ps-dropdown ">
            {loading ? (
                <div>...</div>
            ) : (
                currency && (
                    <a
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleCurrencyPopup();
                        }}>
                        {currency.symbol} {currency.text}
                    </a>
                )
            )}
            {open && <ul className="ps-dropdown-menu ">{renderCurrency()}</ul>}
        </div>
    );
};

const mapStateToProps = (state) => {
    return state.setting;
};

export default connect(mapStateToProps)(CurrencyDropdown);
