import React from 'react';
import { useRouter } from 'next/router';
const HeaderOrder = ({
    title = 'Dashboard',
    description = 'Everything here',
    auth,
}) => {
    const id_vendor = auth?.id_vendor;
    const router = useRouter();

    return (
        <header className="header--dashboard">
            <div className="header__left">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </header>
    );
};

export default HeaderOrder;
