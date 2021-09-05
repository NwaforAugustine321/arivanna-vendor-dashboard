import React, { useState } from 'react';

const WidgetShopSearchProduct = ({ setKeyword }) => {
    const [Value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setKeyword(Value);
    };

    return (
        <aside className="widget widget_shop">
            <figure>
                <h4 className="widget-title">Search Product</h4>

                <form
                    className="ps-form--quick-search"
                    style={{ flexDirection: 'column' }}
                    onSubmit={handleSubmit}>
                    <div className="ps-form__input">
                        <input
                            id="search-product"
                            className="form-control"
                            type="text"
                            value={Value}
                            placeholder="Enter Product name ..."
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <button className="search-product">Search</button>
                </form>
            </figure>
        </aside>
    );
};

export default WidgetShopSearchProduct;
