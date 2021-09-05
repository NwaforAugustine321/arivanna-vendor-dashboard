import React, { useEffect } from 'react';
import Logo from '~/components/elements/common/Logo';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import NavigationTablet from '~/components/shared/navigation/NavigationTablet';
import HeaderActions from '~/components/shared/headers/modules/HeaderActions';
import MenuCategoriesDropdown from '~/components/shared/menus/MenuCategoriesDropdown';
import { stickyHeader } from '~/utilities/common-helpers';

const HeaderTablet = () => {
    useEffect(() => {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);    
        }
    }, []);

    return (
        <header
            className="header header--tablet"  
            data-sticky="true"
            id="headerSticky"> 
            <div className="header__top"> 
                <div className="ps-container">
                    <div className="header__left">     
                        <Logo />
                        <MenuCategoriesDropdown />     
                    </div>
                    <div className="header__center">
                        <SearchHeader /> 
                    </div>
                    {/* <div className="header__center"></div> */} 
                    <div className="header__right">
                        <HeaderActions /> 
                    </div>
                </div>
            </div>
            <NavigationTablet />    
        </header> 
    );
};

export default HeaderTablet;
