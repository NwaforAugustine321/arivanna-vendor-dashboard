import React from "react";
import DropdownAction from "~/pages/woocommerce/DropdownAction";
/*
const TableProjectItems = ({ products }) => {
  const productItems = products.map((product, index) => {
    const year = new Date(product.date_created).getFullYear();
    const day = new Date(product.date_created).getDate();
    const month = new Date(product.date_created).getMonth() + 1;
    let cat1, cat2;
    if (typeof product.categories === "undefined") {
      cat1 = "";
      cat2 = "";
    } else if (typeof product.categories[0] === "undefined") {
      cat1 = "";
      cat2 = product.categories[1].name;
    } else if (typeof product.categories[1] === "undefined") {
      cat1 = product.categories[0].name;
      cat2 = "";
    } else {
      cat1 = product.categories[0].name;
      cat2 = product.categories[1].name;
    }
    return {
      id: index,
      name: product.name,
      sku: product.sku,
      stock: product.stock_status,
      price: product.price,
      date: `${day}-${month}-${year}`,
      categories: [
        {
          name: cat1,
        },
        {
          name: cat2,
        },
      ],
    };
  });

  const tableItems =
    productItems.length !== 0 ? (
      productItems.map((item) => {
        let badgeView;
        if (item.stock) {
          badgeView = <span className="ps-badge success">Stock</span>;
        } else {
          badgeView = <span className="ps-badge gray">Out of stock</span>;
        }
        return (
          <tr key={item.sku}>
            <td>{item.id + 1}</td>
            <td>
              <a href="#">
                <strong>{item.name}</strong>
              </a>
            </td>
            <td>{item.sku}</td>
            <td>{badgeView}</td>
            <td>
              <strong>{item.price}</strong>
            </td>
            <td>
              <p className="ps-item-categories">
                {item.categories.map((cat) => (
                  <a href="#" key={cat.name}>
                    {cat.name}
                  </a>
                ))}
              </p>
            </td>
            <td>{item.date}</td>
            <td>
              <DropdownAction />
            </td>
          </tr>
        );
      })
    ) : (
      <h4 className="empty-product-list">Products list is empty</h4>
    );

  return (
    <div className="table-responsive">
      <table className="table ps-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Categories</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>
    </div>
  );
};

export default TableProjectItems;*/


function WooCommerce() {
  return <div></div>

}

export default WooCommerce