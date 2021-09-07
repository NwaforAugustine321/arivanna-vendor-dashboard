import React, { useEffect, useRef, useState } from "react"
import ContainerDefault from "~/components/layouts/ContainerDefault"
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard"
import { connect, useDispatch } from "react-redux"
import { CheckLoginStatus } from "~/store/auth/action"
import withAuth from "~/components/hoc/withAuth"
import VendorProductRepository from "~/repositories/VendorProductRepository"
import CategoriesInformationRepository from "../../../repositories/CategoryInformationRepository"
import { Button, Form, Input, notification, Progress, Select, Spin, Switch } from "antd"
import Shipping from "../../../pages/products/components/Shipping"
import { storage } from "../../../firebase/index"
import api_handler from "../../../api/handler"
import Router from "next/router"
import { formatCurrencyNumber, formatToBaseCurrency } from "~/utilities/product-helper"

const CreateProductPage = ({ auth, currency, create_product }) => {
  const currency_string = JSON.stringify(currency)

  const inputFile = useRef(null)
  const token = auth?.token
  const id_vendor = auth?.id_vendor
  const [cleardata, setCleardata] = useState(false)
  const [getproductids, setproductids] = useState(null)
  const [loading, setloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState([])
  const [change, setChange] = useState(true)
  const [urls, setUrls] = useState([])
  const [select, setSelect] = useState(true)
  const [isUploaded, setisUploaded] = useState(false)
  const [is_active, set_is_active] = useState(0)

  const [categories, setCategories] = useState([{ id_product_category: 1, category_name: "All" }])
  const [id_category, set_id_category] = useState(1)

  let productCategoriesSelectOptionView

  useEffect(() => {
    CategoriesInformationRepository.getProductCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((e) => console.log(e));
  }, []);

  productCategoriesSelectOptionView = categories.map((option, i) => (
    <option value={option.id_product_category} key={i}>
      {option.category_name}
    </option>
  ));

  const [product, setProduct] = useState({
    id_vendor,
    p2v_price: "",
    id_vendor: "",
    product_title: "",
    product_desc: "",
    shipping_locations: {},
    SKU: "",
    product_thumbnail: {
      name: "",
      url: null,
    },
    p2v_price: "",
    p2v_promo_price: "",
    p2v_promo_off: "",
    inventory: "",
    shipping_cost_local: "",
    shipping_cost_intl: "",
    is_combined_shipping: 0,
    id_product_thumbnail: "",
  });

  const [id_product_thumbnail, set_id_product_thumbnail] = useState("")

  const dispatch = useDispatch()
  useEffect(() => {
    if (!create_product) {
      load_product_data()
    }
    dispatch(CheckLoginStatus())
  }, [])

  async function load_product_data() {
    setloading(true)
    const id_product = localStorage.getItem("id_product")
    const data = {
      token: token,
      id_product: id_product,
    };
    const route = "product_get_vendor";
    await api_handler.handler
      .api_post(data, route)
      .then((response) => {
        if (!response.success) {
          setloading(false);
        } else {
          setloading(false);
          document.getElementById("product_name").value =
            response.data.product_title;
          document.getElementById("reg_price").value = response.data.p2v_price;
          document.getElementById("prod_desc").value =
            response.data.product_desc;
          document.getElementById("SKU").value = response.data.SKU;
          document.getElementById("p2v_promo_price").value =
            response.data.p2v_promo_price;
          document.getElementById("qty_in_stock").value =
            response.data.inventory;
          document.getElementById("shipping_cost_local").value =
            response.data.shipping_cost_local;
          document.getElementById("shipping_cost_intl").value =
            response.data.shipping_cost_intl;
          
          set_id_product_thumbnail(response.data.id_product_thumbnail);
          set_is_active(response.data.is_active ? 1 : 0);
          set_id_category(response.data.id_category);
          setproductids([
            response.data.id_product,
            response.data.id_product_m2m_vendor,
          ]);
          
          setProduct({
            ...response.data,
            p2v_price_original: response.data.p2v_price,
            p2v_price: formatCurrencyNumber(response.data.p2v_price, currency),
            p2v_promo_price_original: response.data.p2v_promo_price,
            p2v_promo_price: formatCurrencyNumber(response.data.p2v_promo_price, currency),
            shipping_cost_local_original: response.data.shipping_cost_local,
            shipping_cost_local: formatCurrencyNumber(response.data.shipping_cost_local, currency),
            shipping_cost_intl_original: response.data.shipping_cost_intl,
            shipping_cost_intl: formatCurrencyNumber(response.data.shipping_cost_intl, currency),
            shipping_locations: response.data.shipping_locations
              ? JSON.parse(response.data.shipping_locations)
              : {},
            product_thumbnail: { url: response.data.url },
            is_combined_shipping: response.data?.is_combined_shipping ?? 0,
          });
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  async function handle_submit(event) {
    var route;
    var data;
    var notif;
    if (create_product) {
      route = "product-create";
      notif = {
        success: "Create product success",
        failed: "Create product failed",
      };
    } else {
      setProduct((prevState) => {
        return {
          ...prevState,

          id_product_thumbnail: id_product_thumbnail,
        };
      });
      route = "product_update";
      notif = {
        success: "Update product success",
        failed: "Update product failed",
      };
    }
    data = {
      token: token,
      id_category,
      product_title: document.getElementById("product_name").value,
      product_desc: document.getElementById("prod_desc").value,
      shipping_locations: product.shipping_locations,
      SKU: document.getElementById("SKU").value,
      p2v_promo_off: "",
      inventory: document.getElementById("qty_in_stock").value,
      p2v_price: formatToBaseCurrency(product.p2v_price, currency),
      p2v_promo_price: formatToBaseCurrency(product.p2v_promo_price, currency),
      shipping_cost_local: formatToBaseCurrency(product.shipping_cost_local, currency),
      shipping_cost_intl: formatToBaseCurrency(product.shipping_cost_intl, currency),
      is_combined_shipping: product.is_combined_shipping,
      id_product: getproductids ? getproductids[0] : "",
      id_product_m2m_vendor: getproductids ? getproductids[1] : "",
      id_vendor: id_vendor,
      product_thumbnail: product.product_thumbnail,
      id_product_thumbnail: product.id_product_thumbnail,
      product_images: urls,
      is_active,
    };

    if (data.p2v_promo_price) {
      data.p2v_promo_off = (
        ((data.p2v_price - data.p2v_promo_price) / data.p2v_price) *
        100
      ).toFixed(2);
      data.is_sale = 1;
    }

    setloading(true);

    await api_handler.handler
      .api_post(data, route)
      .then((response) => {
        if (response.success) {
          notification.success({
            message: "Success",
            description: notif.success,
          });
          if (create_product) {
            // clearform();
            setProduct({ ...product, shipping_locations: {} });
          }

          Router.push("/products");
        } else {
          notification.error({
            message: "Error",
            description: notif.failed,
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: notif.failed,
        });
        throw error;
      });

    setloading(false);
  }

  const onUpdateShippingDetails = (shipping_locations) => {
    setProduct((product) => ({ ...product, shipping_locations }));
  };

  const handleIsActiveSwitchChange = (e) => {
    if (product.product_thumbnail.url) {
      set_is_active(e ? 1 : 0);
    }
  };

  const handleCombinedShippingAllowed = (e) => {
    setProduct((product) => ({
      ...product,
      is_combined_shipping: product.is_combined_shipping === 0 ? 1 : 0,
    }))
  }

  const handleChooseThumbnail = () => {
    inputFile.current.click();
  };

  const handleRender = () => {
    return urls.map((url, i) => {
      return (
        <React.Fragment key={i}>
          <div className={"image_container mt-4"}>
            <img
              src={url}
              style={{
                width: "100%",
                height: "100%",
              }}
              alt="Thumbnail"
            />
          </div>
          <button
            type="button"
            className="ps-btn ps-btn--sm mb-4"
            onClick={() => {
              storage
                .refFromURL(url)
                .delete()
                .then(() => {
                  const index = urls.findIndex((link) => {
                    return link === url;
                  });
                  if (index) {
                    urls.splice(index, 1);
                    file.splice(index, 1);
                    setUrls((prevState) => [...prevState]);

                    setFile((prevState) => [...prevState]);
                    // dispatch(handleRender());
                  } else {
                    urls.shift(index, 1);
                    file.shift(index, 1);
                    setUrls((prevState) => [...prevState]);

                    setFile((prevState) => [...prevState]);
                  }

                  setisUploaded(true);
                });
            }}
          >
            Remove
          </button>
        </React.Fragment>
      );
    });
  };

  const handleFirebase = (image, id) => {
    const uploadTask = storage
      .ref(`images/product_images/${id_vendor}/${image.name}`)
      .put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        await storage
          .ref("images")
          .child("product_images")
          .child(`${id_vendor}`)
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrls((prevState) => [...prevState, url]);
            setProduct((prevState) => {
              return {
                ...prevState,
                product_thumbnail: {
                  url,
                  name: file[id].name,
                },
              };
            });
          });
      }
    );
  };

  const handleUploadImage = () => {
    for (let index = 0; index < file.length; index++) {
      handleFirebase(file[index], index)
    }
  }
  const handleFileChoose = e => {
    setSelect(true)
    setChange(false)
    setFile([...e.target.files])
  }
  const onChangeField = (field, { target: { value: input } }) => {
    setProduct(product => ({ ...product, [field]: input }))
  }

  const updatePriceAmountsPerCurrency = useRef(currency => {
    setProduct(product => ({
      ...product,
      p2v_price: formatCurrencyNumber(product.p2v_price_original, currency),
      p2v_promo_price: formatCurrencyNumber(product.p2v_promo_price_original, currency),
      shipping_cost_local: formatCurrencyNumber(product.shipping_cost_local_original, currency),
      shipping_cost_intl: formatCurrencyNumber(product.shipping_cost_intl_original, currency),
    }))
  })

  useEffect(() => {
    if (currency_string) {
      updatePriceAmountsPerCurrency.current(JSON.parse(currency_string))
    }
  }, [currency_string])
  
  return (
    <ContainerDefault title="Edit product">
      <HeaderDashboard
        title={create_product ? "Create Product" : "Edit Product"}
        description={
          create_product ? "Arivanna Create Product" : "Arivanna Edit Product"
        }
      />
      <div hidden id="shipping"></div>
      <section className="ps-new-item">
        {loading ? (
          <Spin />
        ) : (
          <Form
            onFinish={handle_submit}
            className="ps-form ps-form--new-product"
          >
            <div className="ps-form__content">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <figure className="ps-block--form-box">
                    <figcaption>General</figcaption>
                    <div className="ps-block__content">
                      <div className="form-group">
                        <label>
                          Product Name<sup>*</sup>
                        </label>
                        <input
                          required
                          id="product_name"
                          className="form-control"
                          type="text"
                          placeholder="Enter product name..."
                        />
                      </div>

                      <div hidden className="form-group">
                        <label>
                          Product Summary<sup>*</sup>
                        </label>
                        <textarea
                          id="prod_summary"
                          className="form-control"
                          rows="2"
                          placeholder="Enter Product Summary"
                          name="editordata"
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label>
                          Regular Price<sup>*</sup>
                        </label>
                        <Input
                          required
                          prefix={currency.symbol}
                          suffix={currency.text}
                          id="reg_price"
                          className="form-control"
                          type="number"
                          placeholder="Enter Regular Price"
                          value={product.p2v_price}
                          onChange={({target: {value: input}}) => setProduct({...product, p2v_price: input})}
                        />
                      </div>

                      <div className="form-group">
                        <label>Local shipping rate</label>
                        <Input
                          id="shipping_cost_local"
                          className="form-control"
                          prefix={currency.symbol}
                          suffix={currency.text}
                          type="number"
                          placeholder="Enter Local shipping rate"
                          value={product.shipping_cost_local}
                          onChange={({target: {value: input}}) => setProduct({...product, shipping_cost_local: input})}
                        />
                      </div>

                      <div className="form-group">
                        <label>International shipping rate</label>
                        <Input
                          id="shipping_cost_intl"
                          className="form-control"
                          prefix={currency.symbol}
                          suffix={currency.text}
                          type="number"
                          placeholder="Enter International shipping rate"
                          value={product.shipping_cost_intl}
                          onChange={({target: {value: input}}) => setProduct({...product, shipping_cost_intl: input})}
                        />
                      </div>

                      <div className="form-group">
                        <label>Is combined shipping allowed?</label>
                        <div>
                          <Switch
                            onChange={handleCombinedShippingAllowed}
                            checkedChildren="ALLOWED"
                            unCheckedChildren="NOT ALLOWED"
                            checked={product.is_combined_shipping === 1}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>
                          Product Description<sup>*</sup>
                        </label>
                        <textarea
                          id="prod_desc"
                          required
                          className="form-control"
                          rows="6"
                          name="editordata"
                          placeholder="Enter Product Description"
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label>
                          Product Category<sup>*</sup>
                        </label>
                        <div
                          style={{
                            borderTopLeftRadius: "5px",
                            borderBottomLeftRadius: "5px",
                          }}
                          className="ps-form__categories"
                        >
                          <select
                            value={id_category}
                            className="form-control"
                            onChange={(e) => set_id_category(e.target.value)}
                          >
                            {productCategoriesSelectOptionView}
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Product Status</label>
                        <div>
                          <Switch
                            onChange={handleIsActiveSwitchChange}
                            checkedChildren="PRODUCT ACTIVE"
                            unCheckedChildren="PRODUCT INACTIVE"
                            defaultChecked={is_active}
                            disabled={
                              product.product_thumbnail.url ? false : true
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </figure>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <figure className="ps-block--form-box">
                    <figcaption>Product Images</figcaption>
                    <div className="ps-block__content">
                      <div className="form-group">
                        {/*product.product_thumbnail.name ? product.product_thumbnail.name : <label>Select product image...</label>*/}

                        <input
                          ref={inputFile}
                          id="prod_image"
                          type="file"
                          accept="image/*"
                          multiple
                          style={{ display: "none" }}
                          onChange={handleFileChoose}
                        />
                        {select ? (
                          <span className="image_container_display mb-1">{`Selected ${file.length}`}</span>
                        ) : undefined}
                        <div>
                          {product.product_thumbnail.url && change ? (
                            <div className={"image_container mt-4"}>
                              <img
                                src={product.product_thumbnail.url}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                }}
                                alt="Thumbnail"
                              />
                            </div>
                          ) : undefined}
                        </div>
                        <div>{handleRender()}</div>

                        <div className="btn-position">
                          <label htmlFor="prod_image">
                            <button
                              type="button"
                              className={`ps-btn ps-btn--sm ${
                                product.product_thumbnail.url && change
                                  ? "mt-4"
                                  : ""
                              }`}
                              onClick={handleChooseThumbnail}
                            >
                              Choose
                            </button>
                          </label>

                          <button
                            type="button"
                            className="ps-btn ps-btn--sm ml-3"
                            onClick={handleUploadImage}
                          >
                            Upload
                          </button>
                        </div>

                        <Progress percent={isUploaded ? undefined : progress} />
                      </div>
                      <div hidden className="form-group">
                        <label>Product Gallery</label>
                        <div className="form-group--nest">
                          <input
                            id="prod_gallary"
                            className="form-control mb-1"
                            type="text"
                            placeholder=""
                          />
                          <button className="ps-btn ps-btn--sm">Choose</button>
                        </div>
                      </div>
                      <div hidden className="form-group form-group--nest">
                        <input
                          id="prod_gallary_2"
                          className="form-control mb-1"
                          type="text"
                          placeholder=""
                        />
                        <button className="ps-btn ps-btn--sm">Choose</button>
                      </div>
                    </div>
                  </figure>

                  <figure className="ps-block--form-box">
                    <figcaption>Inventory</figcaption>
                    <div className="ps-block__content">
                      <div className="form-group">
                        <label>SKU</label>
                        <input
                          id="SKU"
                          className="form-control"
                          type="text"
                          placeholder="Enter SKU"
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          Quantity In Stock<sup>*</sup>
                        </label>
                        <input
                          id="qty_in_stock"
                          required
                          className="form-control"
                          type="number"
                          placeholder="Enter QTY In Stock"
                        />
                      </div>
                      <div className="form-group">
                        <label>Sale Price</label>
                        <Input
                          id="p2v_promo_price"
                          className="form-control"
                          prefix={currency.symbol}
                          suffix={currency.text}
                          type="number"
                          placeholder="Enter Sale Price"
                          value={product.p2v_promo_price}
                          onChange={({target: {value: input}}) => setProduct({...product, p2v_promo_price: input})}
                        />
                      </div>
                    </div>
                  </figure>

                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <Form.Item
                        name="shipping"
                        rules={[
                          {
                            validator: (rule, val) => {
                              if (
                                typeof product.shipping_locations ===
                                  "object" &&
                                Object.keys(product.shipping_locations).length
                              ) {
                                return Promise.resolve("Success");
                              }
                              return Promise.reject("Shipping must be added");
                            },
                          },
                        ]}
                      >
                        <Shipping
                          shipping_locations={product.shipping_locations}
                          onUpdateShippingDetails={onUpdateShippingDetails}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ps-form__bottom">
              <a className="ps-btn ps-btn--black" href="/products">
                Back
              </a>
              <a href="/products" className="ps-btn ps-btn--gray">
                Cancel
              </a>
              <button type="submit" className="ps-btn" disabled={loading}>
                {
                  //Checks if creating product or editing product
                  create_product ? (
                    //Runs if creating product
                    loading ? ( // checks loading state
                      <div>
                        <Spin size="small" /> Please wait
                      </div>
                    ) : (
                      "Create Product"
                    )
                  ) : loading ? (
                    <div>
                      <Spin size="small" /> Please wait
                    </div>
                  ) : (
                    "Update Product"
                  )
                }
                {}
              </button>
            </div>
          </Form>
        )}
      </section>
    </ContainerDefault>
  );
};
export default withAuth(
  connect((state) => ({ ...state.auth, ...state.settings }))(CreateProductPage)
);
