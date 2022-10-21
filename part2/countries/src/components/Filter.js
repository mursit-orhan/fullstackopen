import React from 'react';

const Filter = ({ value, onChange }) => {
	return (
		<div>
			find countries : <input filter="name" value={value} onChange={onChange} />
		</div>
	);
};

export default Filter;
