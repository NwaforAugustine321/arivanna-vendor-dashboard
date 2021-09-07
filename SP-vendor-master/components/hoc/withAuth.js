import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

const withAuth = (Component, Router) => {
	const Auth = (props) => {
		// const token =
		//   props.auth?.token ||
		//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWRfdXNlciI6NTY5LCJpYXQiOjE2MjUxNTMzMjV9.vcyiroQnVDxV_RgmYnaiIC3ilMpFtkO2ZQuyhZP5dfw";
		// const id_vendor = props.auth?.id_vendor || 127;

		const token = props.auth?.token;
		const id_vendor = props.auth?.id_vendor;

		const auth = JSON.stringify({
			id_vendor,
			token,
		});

		const router = useRouter();

		useEffect(() => {
			if (!(token && id_vendor)) {
				router.push('/account/login');
			}
		}, [token, id_vendor]);

		return <Component {...props} />;
	};

	if (Component.getInitialProps) {
		Auth.getInitialProps = Component.getInitialProps;
	}
	const mapStateToProps = (state) => {
		return {
			auth: state.auth,
		};
	};

	return connect(mapStateToProps)(Auth);
};

export default withAuth;
