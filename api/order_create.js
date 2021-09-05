// import api_post from './handler_';

export default async function createOrder(req, res) {
    console.log(req);
    // const { id_user, id_product_m2m_vendor } = req;

    // const response = api_post(
    //     {
    //         id_user,
    //         id_product_m2m_vendor,
    //     },
    //     'order_create'
    // );

    // console.log(response);
    res.send({ success: true });
}

// console.log(api_post);
