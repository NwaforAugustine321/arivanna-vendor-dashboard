import React from 'react';
import Link from 'next/link';
const FooterCopyright = () => {
	return (
		<React.Fragment>
			<Link href={'/bug-report'}>
				<a>
					<i className={'icon-bug'}></i>
					{'Bug-Report'}
				</a>
			</Link>
			<div className='ps-copyright'>
				<img hidden src='/img/logo.png' alt='' />
				<p>
					<span>&reg;</span>2021 Arivanna. <br /> All rights reversed.
				</p>
			</div>
		</React.Fragment>
	);
};

export default FooterCopyright;
