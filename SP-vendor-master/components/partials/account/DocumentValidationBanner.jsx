import React , {useState, useEffect} from 'react';
import { useCallback } from 'react';
import {Alert} from 'reactstrap';
import VendorInformationRepository from '~/repositories/VendorInformationRepository';

function DocumentValidationBanner() {

    const [alert, setAlert] = useState(null);

    const onCloseAlert = useCallback(() => {
        setAlert(null)
    }, [setAlert])

    useEffect(() => {

        VendorInformationRepository.getVendorDetails()
            .then(vendor => {
                if(vendor.is_documents_verified === 0){
                    setAlert(true)
                }else{
                    setAlert(null)
                }
            }).catch(error => setAlert(null))

    }, [])

    return (
        <div className='document-alert-container'>
            <Alert isOpen={alert} color='warning' toggle={onCloseAlert}>
                Please Complete Your Verification by Submitting your Documents!
            </Alert>
        </div>
    )
}

export default DocumentValidationBanner
