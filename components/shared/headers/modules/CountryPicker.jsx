import React, { Component, memo } from 'react';
import { notification } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import SettingRepository from '../../../../repositories/SettingRepository';
import { changeCountrySuccess } from '../../../../store/setting/action';

const arePropsEqual = (prev, next) => {
    return prev.country?.text === next.country?.text;
};

const CountryPicker = ({ country }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        SettingRepository.getCountryDetection()
            .then((result) => {
                if (result.status === 200) {
                    dispatch(
                        changeCountrySuccess({
                            code: result.data.countryCode,
                            text: result.data.country,
                        })
                    );
                }
            })
            .catch((error) => {
            });
    }, []);

    return (
        <div className="language">
            <a href="#">
                <img src={`https://www.countryflags.io/${country?.code}/flat/24.png`} alt={country?.code}/>
                <span className="language-space">{country?.text}</span>
            </a>
        </div>
    );
};

export default connect((state) => ({ country: state.setting.country }))(
    memo(CountryPicker, arePropsEqual)
);
