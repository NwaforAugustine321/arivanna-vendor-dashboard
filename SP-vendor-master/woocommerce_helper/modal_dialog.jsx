import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import {
  setCustomerKey,
  setCustomerSecret,
  setURL,
} from "~/store/woocommerce/action";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [urls, setURLs] = useState("");
  const [customerKeys, setCustomerKeys] = useState("");
  const [customerSecrets, setCustomerSecrets] = useState("");
  const dispatch = useDispatch();

  // Enable the modal dialog to be visible
  useEffect(() => {
    setVisible(true);
  }, []);

  // Dispatch customerKey to the saga middleware
  useEffect(() => {
    dispatch(setCustomerKey(customerKeys));
  }, [customerKeys]);

  // Dispatch customerSecret to the saga middleware
  useEffect(() => {
    dispatch(setCustomerSecret(customerSecrets));
  }, [customerSecrets]);

  // Dispatch WooCommerce URL to the saga middleware
  useEffect(() => {
    dispatch(setURL(urls));
  }, [urls]);

    // EventHandler for the credential
  function uploadCredential(event) {
    event.preventDefault();
    const url = document.querySelector(`input[id="url"]`).value;
    const customerKey = document.querySelector(`input[id="ck"]`).value;
    const customerSecret = document.querySelector(`input[id="cs"]`).value;
    if (url === "" || customerKey === "" || customerSecret === "") {
      window.alert("Empty credential field");
    } else {
      setURLs(url);
      setCustomerKeys(customerKey);
      setCustomerSecrets(customerSecret);
    }
    setVisible(false);
  }
  return (
    <>
      <Modal
        title="Please Provide Your Valid WooCommerce credentials"
        centered
        visible={visible}
        onOk={uploadCredential}
        onCancel={() => setVisible(false)}
        width={800}
        height={500}
        okText="Upload Credential"
        cancelButtonProps={{ size: "middle", type: "danger" }}
        cancelText="Abort Operation"
      >
        <form className="ps-form--account-settings" method="get">
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label>WooCommerce URL</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="https://example.com"
                  id="url"
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>Customer key</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  id="ck"
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>Customer Secret</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  id="cs"
                />
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default App;
