import React, { useEffect, useRef, useState } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import Pagination from '~/components/elements/basic/Pagination';
import TableProductItems from '~/components/shared/tables/TableProductItems';
import { Select, Spin } from 'antd';
import Link from 'next/link';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { toggleDrawerMenu } from '~/store/app/action';
import withAuth from '~/components/hoc/withAuth';
import ProductInformationRepository from '~/repositories/ProductInformationRepository';
import CategoriesInformationRepository from '~/repositories/CategoryInformationRepository';
import { notification } from 'antd';
import { useCallback } from 'react';

const { Option } = Select;
const ProductPage = () => {
  const [value, setValue] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [paginationData, setPaginationData] = useState([0, 0]);
  const [loading, setloading] = useState(true);
  const [filterSearch, setFilterSearch] = useState("");
  const [method, setMethod] = useState(true); // default to onchange to get filter product search item that match
  const inputSearch = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
    getData();
  }, []);

  // useEffect(() => {
  // 	// if (value.length === 0) {
  // 	// 	setFilterSearch([]);
  // 	// 	console.log(value);
  // 	// }
  // }, [filterSearch]);
  const activateButtonSeach = (e) => {
    e.preventDefault();
    // setMethod(false); // for using button for the product searching
    searcProduct(value);
  };

  const modalSearchMessage = (total) => {
    const args = {
      message: "Product",
      description: total ? `Found ${total} Product` : "No product found",
      duration: 1,
    };

    notification.open(args);
  };

  const searcProduct = async (filter) => {
    let searchParaStringFormat = filter.toString().toLocaleLowerCase();
    let result = productItems.filter((product) => {
      let SetStringFormat = product.product_title
        .toString()
        .toLocaleLowerCase();
      let getMatchItem = SetStringFormat.includes(searchParaStringFormat);
      return getMatchItem;
    });
    setFilterSearch(result);

    if (result.length === 0) {
      modalSearchMessage();
    } else {
      // modalSearchMessage(result.length);
    }
  };

  const getOnlyValue = (e) => {
    setValue(e.target.value);
  };

  const onChange = async (e) => {
    if (e.target.value === "") {
      setFilterSearch([]);
      return;
    }

    searcProduct(e.target.value);
  };
  async function getData() {
    setloading(true);
    let tempProductItems = [];
    let tempCategoryItems = [];
    //__getAllCategories__
    let categoryResponse = await CategoriesInformationRepository.getAllCategories();
    if (!categoryResponse.error) tempCategoryItems = categoryResponse.data;

    //__getAllProducts__
    let productResponse = await ProductInformationRepository.getProductDetails();

    if (!categoryResponse.error) {
      tempProductItems = productResponse.data?.filter(product => product.is_deleted === 0)
    }

    //__getAllCategories__
    setCategoryItems(tempCategoryItems);

    //__getAllProducts__
    setProductItems(tempProductItems);

    setPaginationData([
      tempProductItems?.length > 10 ? 10 : tempProductItems?.length,
      tempProductItems?.length,
    ]);
    setloading(false);
  }

  const deleteProductFromList = useCallback((id_product_m2m_vendor) => {
    setProductItems(productItems => productItems.filter(product => product.id_product_m2m_vendor !== id_product_m2m_vendor))
  }, [setProductItems])

  return (
    <ContainerDefault title="Products">
      <HeaderDashboard
        title="Products"
        description="Arivanna Product Listing "
      />
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <Link href="/products/create-product">
            <a className="ps-btn success">
              <i className="icon icon-plus mr-2" />
              New Product
            </a>
          </Link>
        </div>
        <div className="ps-section__header">
          <div className="ps-section__filter">
            <form className="ps-form--filter" action="index.html" method="get">
              {/* {
                <div className="ps-form__left">
                  <div className="form-group">
                    <Select
                      placeholder="Select Category"
                      className="ps-ant-dropdown"
                      listItemHeight={20}
                    >
                      <Option value="clothing-and-apparel">
                        Clothing & Apparel
                      </Option>
                      <Option value="garden-and-kitchen">
                        Garden & Kitchen
                      </Option>
                    </Select>
                  </div>
                  <div className="form-group">
                    <Select
                      placeholder="Select Category"
                      className="ps-ant-dropdown"
                      listItemHeight={20}
                    >
                      <Option value="simple-product">Simple Product</Option>
                      <Option value="groupped-product">Groupped product</Option>
                    </Select>
                  </div>
                  <div className="form-group">
                    <Select
                      placeholder="Status"
                      className="ps-ant-dropdown"
                      listItemHeight={20}
                    >
                      <Option value="active">Active</Option>
                      <Option value="in-active">InActive</Option>
                    </Select>
                  </div>
                </div>
              } 
              {
                <div className="ps-form__right">
                  <button className="ps-btn ps-btn--gray">
                    <i className="icon icon-funnel mr-2"></i>
                    Filter
                  </button>
                </div>
              }*/}
						</form>
					</div>
					{
						<div className='ps-section__search'>
							<form className='ps-form--search-simple'>
								<input
									className='form-control'
									type='text'
									ref={inputSearch}
									placeholder='Search product'
									onChange={method ? onChange : getOnlyValue}
								/>
								<button onClick={activateButtonSeach}>
									<i className='icon icon-magnifier'></i>
								</button>
							</form>
						</div>
					}
				</div>
				<div className='ps-section__content'>
					{loading ? (
						<Spin />
					) : filterSearch != '' ? (
						<TableProductItems productItems={filterSearch} categoryItems={categoryItems} deleteProductFromList={deleteProductFromList} />
					) : productItems?.length != 0 ? (
						<TableProductItems productItems={productItems} categoryItems={categoryItems} deleteProductFromList={deleteProductFromList} />
					) : (
						<h3> "No products found!"</h3>
					)}
				</div>
				<div className='ps-section__footer'>
					{
						<React.Fragment>
							<p>
								Show {paginationData[0]} in {paginationData[1]} items.
							</p>
							<Pagination numberOfPages={paginationData[1] > 10 ? paginationData[1] % 10 : 1} />
						</React.Fragment>
					}
				</div>
			</section>
		</ContainerDefault>
	);
};

export default withAuth(connect((state) => state.app)(ProductPage));
