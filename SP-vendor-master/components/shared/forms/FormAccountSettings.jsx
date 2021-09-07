import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import VendorInformationRepository from "~/repositories/VendorInformationRepository";
import { getVendorDetails } from "~/store/settings/action";
import { Form, Input, notification, Spin, Select } from "antd";
import { useRef } from "react";
import PhoneInput from "react-phone-input-2";
import Locations from "~/files/locations.json";

const FormAccountSettings = ({ details, auth }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(null);

  const [vendorInfo, setVendorInfo] = useState(null);

  useEffect(() => {
    if (details) setVendorInfo(details);
  }, [details]);

  useEffect(() => {
    VendorInformationRepository.getVendorDetails()
      .then((result) => {
        dispatch(getVendorDetails(result));
      })
      .catch((err) => {});
  }, []);

  const onUpdateVendorDetails = () => {
    setLoading(true);

    VendorInformationRepository.updateVendorDetails(auth?.id_vendor, vendorInfo)
      .then((result) => {
        if (result.success) {
          notification.success({
            message: "Success",
            description: "Vendor details updated successfully"
          });
        } else {
          notification.error({
            message: "Failed",
            description: "Unable to update right now, Please try again"
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: "Failed",
          description: "Unable to update right now, Please try again"
        });
      })
      .finally(() => {
        setLoading(null);
      });
  };

  const onChangeField = ({ target: { name, value: input } }) => {
    setVendorInfo((info) => ({ ...info, [name]: input }));
  };

  const press = (event) => {
    let a = [];
    let k = event.which;
    for (let i = 1; i < 10; i++) a.push(i);
    if (!(a.indexOf(k) >= 0) && !/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };
  return (
    <Form
      className="ps-form--account-settings"
      onFinish={onUpdateVendorDetails}
    >
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <label>Business Name</label>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Business Name is required"
                }
              ]}
            >
              <Input
                className="form-control"
                name="business_name"
                placeholder="Enter Business Name"
                value={vendorInfo?.business_name}
                type="text"
                onChange={onChangeField}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Short Description</label>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Short Description is required"
                }
              ]}
            >
              <Input
                className="form-control"
                type="text"
                name="vendor_short_desc"
                placeholder="Enter Short Description"
                onChange={onChangeField}
                value={vendorInfo?.vendor_short_desc}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Business ABN</label>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Business ABN is required"
                }
              ]}
            >
              <Input
                className="form-control"
                type="text"
                name="business_abn"
                onChange={onChangeField}
                placeholder="Enter Business ABN"
                value={vendorInfo?.business_abn}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Address</label>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Address is required"
                }
              ]}
            >
              <Input
                name="vendor_address"
                className="form-control"
                type="text"
                onChange={onChangeField}
                placeholder="Enter Address"
                value={vendorInfo?.vendor_address}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group mt-15">
            <Form.Item>
              <label>Country</label>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select country"
                optionLabelProp="label"
                autoClearSearchValue
                suffixIcon={
                  vendorInfo?.country && (
                    <img
                      src={`https://www.countryflags.io/${vendorInfo?.country}/shiny/64.png`}
                      style={{ width: 50 }}
                      alt={vendorInfo?.city}
                    />
                  )
                }
                onSelect={(country) => {
                  setVendorInfo({ ...vendorInfo, country, city: "" });
                }}
                filterOption={(input, option) =>
                  option.props.value
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0 ||
                  option.props.label
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                defaultValue={vendorInfo?.country}
                value={vendorInfo?.country}
              >
                {Locations.map((country, idx) => (
                  <Option key={idx} value={country.code2} label={country.name}>
                    <div className="demo-option-label-item">
                      <span role="img" aria-label={country.name}>
                        <img
                          src={`https://www.countryflags.io/${country.code2}/shiny/64.png`}
                          style={{
                            width: 25,
                            margin: "0 10px 0 0"
                          }}
                          alt={country.code2}
                        ></img>
                      </span>
                      {country.name} ({country.code2})
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
        {/* {console.log(Locations.find((loc) => loc.code2 === vendorInfo?.country))} */}
        {vendorInfo?.country &&
          Locations.find((loc) => loc.code2 === vendorInfo?.country)?.states
            ?.length > 1 && (
            <div className="col-sm-6">
              <div className="form-group">
                <Form.Item>
                  <label>City</label>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select State/City"
                    optionLabelProp="label"
                    autoClearSearchValue
                    onSelect={(city) => setVendorInfo({ ...vendorInfo, city })}
                    filterOption={(input, option) =>
                      option.props.value
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0 ||
                      option.props.label
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    value={vendorInfo?.city ?? null}
                  >
                    {Locations.find(
                      (loc) => loc.code2 === vendorInfo?.country
                    ).states.map((city, idx) => (
                      <Option key={idx} label={city.name} value={city.code}>
                        <div className="demo-option-label-item">
                          {city.name}
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
          )}
        <div className="col-sm-6">
          <div className="form-group">
            <label>Postal Code</label>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Postal Code is required"
                }
              ]}
            >
              <Input
                name="user_postal_number"
                className="form-control"
                type="text"
                onChange={onChangeField}
                placeholder="Enter Address"
                value={vendorInfo?.user_postal_number}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Phone Number</label>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Phone Number is required"
                },
                {
                  pattern: /^\d{10,14}$/,
                  message: "Phone Number must be 10 - 14 digits only"
                }
              ]}
            >
              <PhoneInput
                country={"us"}
                inputProps={{
                  required: true,
                  autoFocus: true
                }}
              >
                <Input
                  className="form-control"
                  type="text"
                  onChange={onChangeField}
                  name="vendor_phone_number"
                  placeholder="Enter Phone Number"
                  value={vendorInfo?.vendor_phone_number}
                  onKeyPress={press}
                  onChange={onChangeField}
                  maxlength="11"
                />
              </PhoneInput>
            </Form.Item>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              value={vendorInfo?.vendor_long_desc || ""}
              rows="6"
              name="vendor_long_desc"
              onChange={onChangeField}
              placeholder="Enter Description"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="ps-form__submit text-center">
        <button
          hidden
          type="button"
          disabled={loading}
          className="ps-btn ps-btn--gray mr-3"
        >
          Reset
        </button>
        <button type="submit" disabled={loading} className="ps-btn success">
          {loading ? <Spin spinning size="small" /> : "Update Profile Settings"}
        </button>
      </div>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    details: state.settings.details,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(FormAccountSettings);
