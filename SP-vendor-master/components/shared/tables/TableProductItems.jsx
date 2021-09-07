import React from 'react';
import DropdownAction from '~/components/elements/basic/DropdownAction';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { formatCurrency } from '~/utilities/product-helper';

const TableProductItems = ({ productItems, categoryItems, deleteProductFromList, currency }) => {
	const router = useRouter();

	function handle_click_edit_product(item) {
		localStorage.setItem('id_product', item.id_product);
		router.push('/products/edit-product');
	}

	//__Mapping Category ID's to Category names__
	const mapIdToCat = (id) => {
		let out = '';
		if (categoryItems.length !== 0)
			categoryItems.forEach((element) => {
				if (element.id_product_category === id) {
					out = element.category_name;
				}
			});

		return out;
	};

  const tableItems = productItems.length === 0 ? [] :
    productItems.map((item, index) => {
      let badgeView;
      let statusView
      if (item.inventory) {
        badgeView = <span className="ps-badge success">{item.inventory}</span>;
      } else {
        badgeView = <span className="ps-badge gray">Out of stock</span>;
      }

      if (item.is_active == 1) {
        statusView = <span className="ps-badge success">Active</span>;
      } else {
        statusView = <span className="ps-badge gray">Inactive</span>;
      }



      return (
        <tr key={index} className={item?.is_deleted ? 'deleted' : ''}>
          <td>{index + 1}</td>
          <td>{statusView}</td>
          <td>
            <a onClick={() => handle_click_edit_product(item)} >
              <strong>{item.product_title}</strong>
            </a>
          </td>
          <td>{item.product_desc}</td>
          <td>{badgeView}</td>
          <td>
            <strong>{formatCurrency(item.p2v_price, currency)}</strong>
          </td>
          <td>
            <p className="ps-item-categories">
              {mapIdToCat(item.id_category)}
            </p>
          </td>
          <td>{item.created_at.toString().slice(0, 10)}</td>
          <td>
            <DropdownAction 
            item_data= {item}
            deleteProductFromList={deleteProductFromList}
            />
          </td>
        </tr>
      );
    });

  return (
    <div className="table-responsive">
      <table className="table ps-table product-table-view">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Name</th>
            <th>Product Description</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Categories</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>
    </div>
  );
};

export default connect(state => state.settings)(TableProductItems);
