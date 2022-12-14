import { useState } from 'react';

const App = () => {
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
	];

	const [selected, setSelected] = useState(0);
	const voteArray = new Array(anecdotes.length).fill(0);
	const [votes, setVotes] = useState(voteArray);

	let randomIndex = 0;
	while (selected === randomIndex) {
		randomIndex = getRandomInt(anecdotes.length);
	}

	const handleVotes = () => {
		const copyOfVotes = [...votes];
		copyOfVotes[selected] += 1;
		setVotes(copyOfVotes);
	};
	const max = Math.max(...votes);

	const maxVoted = votes.indexOf(max);

	return (
		<div>
			<h1>Anecdote of the day</h1>
			{anecdotes[selected]}
			<p>has {votes[selected]} votes</p>
			<p>
				<button onClick={handleVotes}>vote</button>
				<button onClick={() => setSelected(randomIndex)}>next anecdote</button>
			</p>
			<h1>Anecdote with most votes</h1>
			{anecdotes[maxVoted]}
		</div>
	);
};

export default App;
