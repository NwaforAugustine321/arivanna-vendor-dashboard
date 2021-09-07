import React from 'react';
import { Dropdown, Menu, Spin } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import VendorProductRepository from '~/repositories/VendorProductRepository';
import { useState } from 'react';

const DropdownAction = ({item_data, deleteProductFromList}) => {

    const [loading, setLoading] = useState(null);

    const router = useRouter()

    function handle_click_edit_product() {
        localStorage.setItem('id_product',item_data.id_product)
        router.push('/products/edit-product')
       }

    const onDeleteProduct = () => {

        setLoading(true)

        const id_product_m2m_vendor = item_data.id_product_m2m_vendor;
        VendorProductRepository.deleteProduct(id_product_m2m_vendor)
            .then(response => {
                if(response.success){
                    setLoading(null)
                    deleteProductFromList(id_product_m2m_vendor)
                }
            }).catch(err => {
                console.log(err)
                setLoading(null)
            })
    }   

    return (
        loading ? <Spin/> :
        
        <div className='actions-list'>
            { !item_data.is_deleted &&
                <a onClick={handle_click_edit_product} title="Edit">
                    <i className={"icon-pencil"}></i>
                </a>
            }
            { !item_data.is_deleted &&
                <a className="dropdown-item" onClick={onDeleteProduct} title={item_data?.is_deleted ? "Undelete" : "Delete"}>
                    <i className={item_data?.is_deleted ? "icon-check" : "icon-trash2"}></i>
                </a>
            }
        </div>
    );
};

export default DropdownAction;
