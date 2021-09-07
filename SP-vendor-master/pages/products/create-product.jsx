import React from "react";
import { connect } from "react-redux";
import withAuth from "~/components/hoc/withAuth";
import ProductDetails from '../../components/shared/forms/ProductDetails'

const CreateProductPage = (props) => {
  return (

    
    <ProductDetails
    create_product={true}
    ></ProductDetails>
  );
};
export default withAuth(connect((state) => state.app)(CreateProductPage));
