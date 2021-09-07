import React from 'react';
import { CurrencyTypes } from './constant-class';

function formatFromBaseCurrency(amount, currency, decimal) {
    switch (currency.text) {
        case CurrencyTypes.AUD:
            return Number(amount).toFixed(decimal);
        case CurrencyTypes.INR:
            return Number(amount * currency.rating).toFixed(decimal);
        default:
            return Number(amount).toFixed(decimal);
    }
}


export function formatCurrency(num, currency = {symbol: '$', text: 'AUD'}, decimal = 2) {
    // console.log(num)
    var formatted = null;

    if (num) {

        if (currency && currency.text) {

            switch (currency.text) {

                case CurrencyTypes.AUD:
                    formatted = formatFromBaseCurrency(Number(num), currency, decimal)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        break;
                case CurrencyTypes.INR:
                    formatted = formatFromBaseCurrency(Number(num), currency, decimal)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        break;
                default:
                    formatted = Number(num)
                        .toFixed(decimal)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
        } else {
            
            formatted = Number(num).toFixed(decimal)
                .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        return (currency.symbol + ' ' + formatted)

    }

    return formatted

}


export function formatCurrencyNumber(num, currency = {symbol: '$', text: 'AUD'}) {

    var formatted = 0;

    if (num) {

        if (currency && currency.text) {

            switch (currency.text) {

                case CurrencyTypes.AUD:
                    formatted = formatFromBaseCurrency(Number(num), currency);
                        break;
                case CurrencyTypes.INR:
                    formatted = formatFromBaseCurrency(Number(num), currency)
                        break;
                default:
                    formatted = Number(num).toFixed(2)
            }

        } else {

            formatted = Number(num).toFixed(2);
        }

        return formatted

    }

    return formatted

}


export function formatToBaseCurrency(amount, currency) {

    
    switch (currency.text) {
        case CurrencyTypes.AUD:
            return Number(amount).toFixed(5);
        case CurrencyTypes.INR:
            return Number(amount / currency.rating).toFixed(5);
        default:
            return Number(amount).toFixed(5);
    }
    

}