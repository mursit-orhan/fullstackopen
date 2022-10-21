import React from 'react';

const Persons = ({ people, handleDelete }) => {
	return people.map(({ id, name, number }) => (
		<div key={id}>
			{name} {number}
			<button onClick={() => handleDelete(id)}> delete</button>
		</div>
	));
};

export default Persons;
