import React from 'react';
import './App.css';

function App() {

	const [message, setMessage] = React.useState({
		to: "",
		content: ""
	});

	const [err, setErr] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const onInputHandle = (e) => {
		e.preventDefault();
		setMessage({ [e.target.name]: e.target.value });
	}

	const submit = (e) => {
		e.preventDefault();

		setLoading(true);
		fetch('api/messages', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(message)
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					setMessage({
						to: "",
						content: ""
					});
					setErr(false);
					setLoading(false);
				} else {
					setErr(true);
					setLoading(false);
				}
			})
	}
	return (

		<form onSubmit={submit}>
			<div className='form-content'>
				{err && "Error!!!"}
				<label>
					<input
						type={"text"}
						name={"to"}
						value={message.to}
						onChange={onInputHandle}
						placeholder={"Please input to"}
					/>
				</label>
				<label>
					<textarea
						rows={5}
						name={"content"}
						value={message.content}
						onChange={onInputHandle}
						placeholder={"Please input message"}
					/>
				</label>
				<button>Send Message</button>
				{loading && "Loading..."}
			</div>
		</form>
	);
}

export default App;
