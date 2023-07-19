import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={460}
		viewBox="0 0 280 460"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<circle cx="140" cy="140" r="120" />
		<rect x="25" y="270" rx="10" ry="10" width="230" height="25" />
		<rect x="0" y="310" rx="10" ry="10" width="280" height="88" />
		<rect x="0" y="410" rx="10" ry="10" width="100" height="30" />
		<rect x="140" y="410" rx="25" ry="25" width="140" height="45" />
	</ContentLoader>
);

export default Skeleton;
