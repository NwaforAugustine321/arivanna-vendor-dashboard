import React, { useState } from 'react';
import { Radio, Select } from 'antd';
import PayPal from '../account/Paypal-exp';
import Router from 'next/router';

const Donate = () => {
    const [method, setMethod] = useState(1);
    const [amount, setAmount] = useState(null);

    const handleChange = e => {
        setAmount(e.target.value)
    }

    const handleChangePaymentMethod = e => {
        setMethod(e.target.value);
    };

    let month = [], year = [];
    for (let i = 1; i <= 12; i++) {
        month.push(i);
    }
    for (let i = 2019; i <= 2050; i++) {
        year.push(i);
    }

    return (
        <section className="ps-donate" boxed={true}>
            <div className="text-center" id="method">
                <img className="w-50" src="/static/img/ads/donation.png" alt="donation" />
            </div>
            <div className="d-flex justify-content-center p-5">
                <div className="form-group--nest w-50">
                    <input
                        className="form-control"
                        type="number"
                        placeholder="Donation amount"
                        value={amount}
                        onChange={handleChange}
                    />
                    <button className="ps-btn">
                        <a href="#method">Donate</a>
                    </button>
                </div>
            </div>
            {amount > 0 &&
            <div className="d-flex justify-content-center">
                <div className="ps-block--payment-method w-50">
                    <div className="ps-block__header">
                        <Radio.Group
                            onChange={handleChangePaymentMethod}
                            value={method}>
                            <Radio value={1}>Paypal</Radio>
                            <Radio value={2}>
                                Visa / Master Card
                            </Radio>
                        </Radio.Group>
                    </div>
                    <div className="ps-block__content">
                        {method === 1 ? (
                            <PayPal donate={amount}/>
                        ) : (
                            <div className="ps-block__tab">
                                <div className="ps-block__tab">
                                    <div className="form-group">
                                        <label>
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Card Holders
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="form-group">
                                                <label>
                                                    Expiration
                                                    Date
                                                </label>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <Select
                                                            defaultValue={1}>
                                                            {month.map((item) => (
                                                                    <Option
                                                                        value={item}
                                                                        key={item}
                                                                    >
                                                                        {item}
                                                                    </Option>
                                                                )
                                                            )}
                                                        </Select>
                                                    </div>
                                                    <div className="col-6">
                                                        <Select
                                                            defaultValue={2020}>
                                                            {year.map((item) => (
                                                                    <Option
                                                                        value={item}
                                                                        key={item}
                                                                    >
                                                                        {item}
                                                                    </Option>
                                                                )
                                                            )}
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-group">
                                                <label>
                                                    CVV
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button className="ps-btn ps-btn--fullwidth">
                                            Donate via Card
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>}
        </section>
    );
}
export default Donate;
