import React from 'react';
import withAuth from '~/components/hoc/withAuth';
import FormHeaderSearch from '~/components/shared/forms/FormHeaderSearch';
import { connect, useDispatch } from 'react-redux';
import { logOut } from '~/store/auth/action';
import Router from 'next/router';
import { clearRecentOrders } from '~/store/dashboard/action';

const HeaderDashboard = ({ title = 'Dashboard', description = '', auth }) => {
	const dispatch = useDispatch();

	const onLogoutAction = (evt) => {
		evt.preventDefault();
		dispatch(logOut());
		dispatch(clearRecentOrders());
		Router.push('/');
	};
	const id_vendor = auth?.id_vendor;

	return (
		<header className='header--dashboard'>
			<div className='header__left'>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
			<div className='header__right'>
				<a className='header__site-link' target='_blank' href={`https://arivanna.com/stores/${id_vendor}`}>
					<span>View your store</span>
					<i className='icon-exit-right'></i>
				</a>
			</div>
		</header>
	);
};

export default withAuth(HeaderDashboard);
