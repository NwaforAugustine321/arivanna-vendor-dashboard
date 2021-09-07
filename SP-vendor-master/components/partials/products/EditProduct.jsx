import React, { useEffect } from "react"
import ContainerDefault from "~/components/layouts/ContainerDefault"
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard"
import { connect, useDispatch } from "react-redux"
import { CheckLoginStatus } from "~/store/auth/action"
import withAuth from "~/components/hoc/withAuth"

import api_handler from "../../../api/handler"

const CreateProductPage = props => {
  const token = props.auth?.token
  const id_vendor = props.auth?.id_vendor

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(CheckLoginStatus())
  }, [])

  async function handle_submit(event) {
    event.preventDefault()
    const data = {
      token: token,

      p2v_price: document.getElementById("reg_price").value,
      id_category: 1,
      id_vendor: id_vendor,
      product_title: document.getElementById("product_name").value,
      product_desc: document.getElementById("prod_desc").value,
      shipping_locations: ["AU", "NG"],
      sku: document.getElementById("sku").value,
      product_thumbnail: { url: "/static/img/not-found.jpg" },
      p2v_promo_price: document.getElementById("sale_price").value,
      inventory: document.getElementById("qty_in_stock").value,
    }
    const route = "product-create"

    await api_handler.handler
      .api_post(data, route)
      .then(response => {
        if (!response.success) {
        } else {
        }
      })
      .catch(error => {
        throw error
      })
    window.location.reload(false)
  }

  return (
    <ContainerDefault title="Create new product">
      <HeaderDashboard title="Create Product" description="Arivanna Create New Product " />
      <section className="ps-new-item">
        <form onSubmit={handle_submit} className="ps-form ps-form--new-product">
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
                    {/* <div className="form-group">
                                            <label>
                                                Reference<sup>*</sup>
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Enter product Reference..."
                                            />
                                        </div> */}

                    <div className="form-group">
                      <label>
                        Product Summary<sup>*</sup>
                      </label>
                      <textarea
                        id="prod_summary"
                        required
                        className="form-control"
                        rows="2"
                        name="editordata"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label>
                        Regular Price<sup>*</sup>
                      </label>
                      <input
                        required
                        id="reg_price"
                        className="form-control"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div className="form-group">
                      <label>Sale Price</label>
                      <input id="sale_price" className="form-control" type="text" placeholder="" />
                    </div>
                    {/* <div className="form-group">
                                            <label>
                                                Sale Quantity<sup>*</sup>
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder=""
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
                                            />
                                        </div> */}
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
                      ></textarea>
                    </div>
                  </div>
                </figure>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <figure hidden className="ps-block--form-box">
                  <figcaption>Product Images</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group">
                      <label>Product Thumbnail</label>
                      <div className="form-group--nest">
                        <input
                          id="prod_image"
                          className="form-control mb-1"
                          type="text"
                          placeholder=""
                        />
                        <button className="ps-btn ps-btn--sm">Choose</button>
                      </div>
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
                    {/* <div className="form-group">
                                            <label>Video (optional)</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Enter video URL"
                                            />
                                        </div>
                                        </div> */}
                  </div>
                </figure>
                <figure className="ps-block--form-box">
                  <figcaption>Inventory</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group">
                      <label>SKU</label>
                      <input id="sku" className="form-control" type="text" placeholder="" />
                    </div>
                    <div className="form-group">
                      <label>
                        QTY In Stock<sup>*</sup>
                      </label>
                      <input
                        id="qty_in_stock"
                        required
                        className="form-control"
                        type="text"
                        placeholder=""
                      />
                    </div>
                  </div>
                </figure>
                {/* <figure className="ps-block--form-box">
                                    <figcaption>Inventory</figcaption>
                                    <div className="ps-block__content">
                                    
                                        <div className="form-group form-group--select">
                                            <label>Status</label>
                                            <div className="form-group__content">
                                                <select
                                                    className="ps-select"
                                                    title="Status">
                                                    <option value="1">
                                                        Status 1
                                                    </option>
                                                    <option value="2">
                                                        Status 2
                                                    </option>
                                                    <option value="3">
                                                        Status 3
                                                    </option>
                                                    <option value="4">
                                                        Status 4
                                                    </option>
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
                                                <select
                                                    className="ps-select"
                                                    title="Brand">
                                                    <option value="1">
                                                        Brand 1
                                                    </option>
                                                    <option value="2">
                                                        Brand 2
                                                    </option>
                                                    <option value="3">
                                                        Brand 3
                                                    </option>
                                                    <option value="4">
                                                        Brand 4
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Tags</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </figure> */}
              </div>
            </div>
          </div>
          <div className="ps-form__bottom">
            <a className="ps-btn ps-btn--black" href="products.html">
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
export default withAuth(connect(state => state.app)(CreateProductPage))
