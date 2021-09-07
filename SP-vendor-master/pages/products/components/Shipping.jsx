import React, { useState, useEffect, useCallback } from "react";
import { Form, Select } from "antd";
import locations from "~/files/locations.json";

const { keys, assign } = Object;

function Shipping({ shipping_locations = {}, onUpdateShippingDetails }) {

  const shipping_locations_string = JSON.stringify(shipping_locations);

  const [shipping, setShipping] = useState(shipping_locations ?? {});

  useEffect(() => {

    if(shipping_locations_string){
      setShipping(JSON.parse(shipping_locations_string))
    }

  }, [shipping_locations_string])

  const [currentCountrySelected, setCurrentCountry] = useState(null);

  const onSelectCountryCurrent = useCallback(
    (current) => {
      setCurrentCountry(current);
    },
    [setCurrentCountry]
  );

  const onSelectCountry = useCallback(
    (country) => {
      if (!shipping[country]) {
        setShipping((shipping) => ({ ...shipping, [country]: [] }));
      }
    },
    [setShipping]
  );

  const onRemoveCountry = useCallback(
    (country) => {
      setShipping((shipping) => {
        const ship = assign({}, shipping);

        delete ship[country];
        return ship;
      });
    },
    [setShipping]
  );

  const onChangeStates = useCallback(
    (states) => {
      setShipping((shipping) => ({
        ...shipping,
        [currentCountrySelected]: states,
      }));
    },
    [currentCountrySelected, setShipping]
  );

  const checkIfStatesEmpty = useCallback(() => {
    return (
      locations.find((c) => c.code2 === currentCountrySelected).states.length <
      1
    );
  }, [currentCountrySelected]);

  const checkIfShippingToAll = useCallback(() => {
    return shipping[currentCountrySelected].length < 1;
  }, [shipping, currentCountrySelected]);

  useEffect(() => {
    if (typeof onUpdateShippingDetails === "function") {
      onUpdateShippingDetails(shipping);
    }
  }, [shipping]);

  return (
    <div>
      <figure className="ps-block--form-box">
        <figcaption>Select Shipping Location</figcaption>
        <div className="ps-block__content">
          <div className="form-group">
            <label>
              Countries<sup>*</sup>
            </label>
            <Form.Item>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select country"
                optionLabelProp="label"
                autoClearSearchValue
                value={null}
                onSelect={onSelectCountry}
                filterOption={(input, option) =>
                  option.value
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0 ||
                  option.label
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {locations.map((country, idx) => (
                  <Select.Option key={idx} value={country.code2} label={country.name}>
                    <div className="demo-option-label-item">
                      <span role="img" aria-label={country.name}>
                        <img
                          src={`https://www.countryflags.io/${country.code2}/shiny/64.png`}
                          style={{ width: 25, margin: "0 10px 0 0" }}
                          alt={country.code2}
                        ></img>
                      </span>
                      {country.name} ({country.code2})
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {
              <div className="selected-countries">
                {keys(shipping).map((country, idx) => (
                  <div
                    key={idx}
                    className={
                      "country-item " +
                      (currentCountrySelected === country ? "selected" : "")
                    }
                    onClick={onSelectCountryCurrent.bind(null, country)}
                  >
                    <div>
                      <img
                        src={`https://www.countryflags.io/${country}/shiny/64.png`}
                        style={{ width: 25, margin: "0 10px 0 0" }}
                        alt={country}
                      ></img>
                    </div>
                    <div>
                      {locations.find((c) => c.code2 === country)
                        ? locations.find((c) => c.code2 === country).name
                        : null}
                    </div>
                    <div>
                      <span
                        className="remove-icon"
                        onClick={onRemoveCountry.bind(null, country)}
                      >
                        &times;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            }

            {currentCountrySelected && shipping[currentCountrySelected] && (
              <>
                {!checkIfStatesEmpty() && (
                  <Form.Item>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select states"
                      optionLabelProp="label"
                      mode="multiple"
                      value={shipping[currentCountrySelected]}
                      onChange={onChangeStates}
                      filterOption={(input, option) =>
                        option.props.value
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0 ||
                        option.props.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {locations
                        .find((c) => c.code2 === currentCountrySelected)
                        .states.map((state, idx) => (
                          <Option
                            key={idx}
                            value={state.code}
                            label={state.name}
                          >
                            <div className="demo-option-label-item">
                              {state.name} ({state.code})
                            </div>
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                )}

                {checkIfShippingToAll() ? (
                  <div className="shipped-to-all-states">
                    Shipping to All States in {currentCountrySelected}
                  </div>
                ) : (
                  <div className="shipped-to-all-states">
                    Shipping to {shipping[currentCountrySelected].length} States
                    in {currentCountrySelected}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </figure>
    </div>
  );
}

export default Shipping;
