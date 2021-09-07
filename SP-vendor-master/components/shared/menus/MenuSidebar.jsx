import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux'
import { useRouter } from 'next/router';
import { toggelChatbot } from '~/store/settings/action';

const MenuSidebar = (props) => {
	const router = useRouter();
	const menuItems = [
		{
			text: 'Dashboard',
			url: '/',
			icon: 'icon-home',
		},
		{
			text: 'Orders',
			url: '/orders',
			icon: 'icon-bag2',
		},
		{
			text: 'Products',
			url: '/products',
			icon: 'icon-database',
		},

		{
			text: 'Settings',
			url: '/settings',
			icon: 'icon-cog',
		},

		{
			text: 'Donations',
			url: '/donations',
			icon: 'icon-wallet',
		},
		// {
		// 	text: 'Chat Bot',
		// 	url: '',
		// 	icon: 'icon-phone-wave',
		// },
		// {
		//     text: 'Bug-Report',
		//     url: '/bug-report',
		//     icon: 'icon-bug',
		// },
	];

	return (
		<ul className='menu'>
			{menuItems.map((item, index) => (
				item.url.length !== 0 ?
					<li key={index} className={router.pathname === item.url ? 'active' : ''}>
						<Link href={item.url}>
							<a>
								<i className={item.icon}></i>
								{item.text}
							</a>
						</Link>
					</li>
					:
					<li key={index} onClick={() => props.handleToggelChatbot()}>
						<a>
							<i className={item.icon}></i>
							{item.text}
						</a>
					</li>
			))}
		</ul>
	);
};

const mapStateToProps = (state) => ({
	setting: state.setting
});

const mapDispatchToProps = (dispatch) => ({
	handleToggelChatbot: () => dispatch(toggelChatbot()),
}
);


export default connect(mapStateToProps, mapDispatchToProps)(MenuSidebar);

/**
 *
 *
 *
 *  {
			text: 'Dashboard',
			url: '/',
			icon: 'icon-home',
		},
		{
			text: 'Products',
			url: '/products',
			icon: 'icon-database',
		},
		{
			text: 'Orders',
			url: '/orders',
			icon: 'icon-bag2',
		},
		{
			text: 'Customers',
			url: '/customers',
			icon: 'icon-users2',
		},
		{
			text: 'WooCommerce',
			url: '/woocommerce',
			icon: 'icon-thumbs-up',
		},
		{
			text: 'Settings',
			url: '/settings',
			icon: 'icon-cog',
		},
*/
