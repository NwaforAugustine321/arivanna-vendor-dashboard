import React, { Component, useState, useCallback } from "react";
import { Dropdown, Menu, notification, Tooltip } from "antd";
import { connect } from "react-redux";
import Link from "next/link";
import { changeCurrency } from "~/store/settings/action";
import { useDispatch } from "react-redux";
import VendorSettingRepository from "~/repositories/VendorSettingRepository";
import { CurrenciesList } from "~/utilities/constant-class";

const CurrencyDropdown = ({ currency }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);



  const handleChangeCurrency = async (currency) => {
  

    setLoading(true);

    const result = await VendorSettingRepository.getExchangeRatesLatest(
      currency.text
    );

    if (result) {
      dispatch(changeCurrency({ ...currency, rating: result.conversion_rate }));
    }
    setLoading(false);
  };

  const menu = (
    <Menu>
      {CurrenciesList.map((c, idx) => (
        <Menu.Item
          key={idx}
          disabled={c.text === currency.text}
          onClick={handleChangeCurrency.bind(null, c)}
          icon={<span className="bold">{c.symbol} </span>}
        >
          {c.text}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown.Button
      overlay={menu}
      buttonsRender={([leftButton, rightButton]) => [
        <Tooltip title={loading ? 'Loading' : currency.text} key="left">
          {leftButton}
        </Tooltip>,
        React.cloneElement(rightButton, { loading }),
      ]}
    >
      {`${currency.symbol} ${currency.text}`}
    </Dropdown.Button>
  );
};

const mapStateToProps = (state) => {
  return state.settings;
};

export default connect(mapStateToProps)(CurrencyDropdown);
