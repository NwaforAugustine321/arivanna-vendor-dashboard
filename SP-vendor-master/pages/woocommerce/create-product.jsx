import React, { useEffect, useState } from "react"
import ContainerDefault from "~/components/layouts/ContainerDefault"
import HeaderDashboard from "~/pages/woocommerce/HeaderDashboard"
import { connect, useDispatch } from "react-redux"
import { CheckLoginStatus } from "~/store/auth/action"
import { createProduct } from "~/woocommerce_helper/apiRequest"
import { notification, Space } from "antd"

const CreateProductPage = ({ url, customerKey, customerSecret }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(CheckLoginStatus())
  }, [])
  const [response, setResponse] = useState({})

  // Notification
  function successNotification(type) {
    notification[type]({
      title: "Product successfully created",
      description: response.data,
    })
  }

  function errorNotification(type) {
    notification[type]({
      title: "Internal server error",
      description: response ? response.response.data : "Error creating single product.",
    })
  }

  async function createProducts(event) {
    event.preventDefault()
    const formData = {}
    const formElements = document.querySelector(`form[name="create-product"]`).elements
    for (let index = 0; index < formElements.length; index++) {
      const item = formElements.item(index)
      formData[item.name] = item.value
    }
    const result = await createProduct(url, customerKey, customerSecret, formData)

    setResponse(result)
    if (result.status === 200) {
      successNotification("success")
    } else {
      errorNotification("error")
    }
  }
  return (
    <ContainerDefault title="Create new product">
      <HeaderDashboard title="Create Product" description="Arivanna Create New Product " />
      <section className="ps-new-item">
        <form
          className="ps-form ps-form--new-product"
          action=""
          method="post"
          onSubmit={createProducts}
          name="create-product"
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
                        className="form-control"
                        type="text"
                        placeholder="Enter product name..."
                        name="name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Reference<sup>*</sup>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter product Reference..."
                        name="slug"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Date<sup>*</sup>
                      </label>
                      <input className="form-control" type="date" name="date_created" required />
                    </div>
                    <div className="form-group">
                      <label>
                        Product Summary<sup>*</sup>
                      </label>
                      <text-area
                        className="form-control"
                        rows="6"
                        placeholder="Enter product description..."
                        name="short_description"
                        required
                      ></text-area>
                    </div>
                    <div className="form-group">
                      <label>
                        Regular Price<sup>*</sup>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder=""
                        name="regular_price"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Sale Price<sup>*</sup>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder=""
                        name="sale_price"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Sale Quantity<sup>*</sup>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder=""
                        name="total_sales"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Sold Items<sup>*</sup>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder=""
                        name="stock_quantity"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Product Description<sup>*</sup>
                      </label>
                      <textarea
                        className="form-control"
                        rows="6"
                        name="description"
                        required
                      ></textarea>
                    </div>
                  </div>
                </figure>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <figure className="ps-block--form-box">
                  <figcaption>Product Images</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group">
                      <label>Product Thumbnail</label>
                      <div className="form-group--nest">
                        <input className="form-control mb-1" type="text" placeholder="" />
                        <button className="ps-btn ps-btn--sm">Choose</button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Product Gallery</label>
                      <div className="form-group--nest">
                        <input className="form-control mb-1" type="text" placeholder="" />
                        <button className="ps-btn ps-btn--sm">Choose</button>
                      </div>
                    </div>
                    <div className="form-group form-group--nest">
                      <input className="form-control mb-1" type="text" placeholder="" />
                      <button className="ps-btn ps-btn--sm">Choose</button>
                    </div>
                    <div className="form-group">
                      <label>Video (optional)</label>
                      <input className="form-control" type="text" placeholder="Enter video URL" />
                    </div>
                  </div>
                </figure>
                <figure className="ps-block--form-box">
                  <figcaption>Inventory</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group">
                      <label>SKU</label>
                      <input className="form-control" type="text" placeholder="" name="sku" />
                    </div>
                    <div className="form-group form-group--select">
                      <label>Status</label>
                      <div className="form-group__content">
                        <select className="ps-select" title="Status" name="stock_status">
                          <option value="">Select**</option>
                          <option value="in_stock">In-stock</option>
                          <option value="out_of_stock">Out-of-stock</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </figure>
                <figure className="ps-block--form-box">
                  <figcaption>Meta</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group form-group--select">
                      <label>Brand</label>
                      <div className="form-group__content">
                        <select className="ps-select" title="Brand" name="categories" multiple>
                          <option value="">Select::Many Items</option>
                          <option value="consumables">Consumables</option>
                          <option value="house_hold">House hold</option>
                          <option value="office_supplies">Office supplies</option>
                          <option value="kids">Kids</option>
                          <option value="ladies">Ladies</option>
                          <option value="men">Men</option>
                          <option value="pregnant_women">Pregnant Women</option>
                          <option value="seasonal">Seasonal</option>
                          <option value="electronics">Electronics</option>
                          <option value="car_accessories">Car accessories</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Tags</label>
                      <input className="form-control" type="text" name="tags" />
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </div>
          <div className="ps-form__bottom">
            <a className="ps-btn ps-btn--black" href="/woocommerce">
              Back
            </a>
            <button className="ps-btn ps-btn--gray">Cancel</button>
            <button className="ps-btn">Submit</button>
          </div>
        </form>
      </section>
    </ContainerDefault>
  )
}
export default connect(state => state.woocommerce)(CreateProductPage)
