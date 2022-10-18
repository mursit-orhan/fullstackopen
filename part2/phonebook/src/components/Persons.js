import React from 'react';

const Persons = ({ people }) => {
	return people.map(({ id, name, number }) => (
		<div key={id}>
			{name} {number}
		</div>
	));
};

export default Persons;
