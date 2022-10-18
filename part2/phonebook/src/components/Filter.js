import React from 'react';

const Filter = ({ value, onChange }) => {
	return (
		<div>
			filter shown with:{' '}
			<input filter="name" value={value} onChange={onChange} />
		</div>
	);
};

export default Filter;
