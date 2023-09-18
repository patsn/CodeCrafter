import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

export default function RegisterPage(): JSX.Element {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [submit, setSubmit] = useState<boolean>(false);
	const navigate: NavigateFunction = useNavigate();

	enum ButtonState {
		green = "success",
		red = "danger",
	}

	const currentButtonState = (): ButtonState => {
		if (!username || !password) {
			return ButtonState.red;
		} else {
			return ButtonState.green;
		}
	};

	const handleSubmit = (event: any): void => {
		event.preventDefault();
		setSubmit(true);
		if (username && password) {
			axios
				.post("http://localhost:3001/register", { username, password })
				.then((res): void => {
					if (res.status === 201) {
						navigate("/login"); // Use navigate to change the URL
					} else {
						navigate("/error");
					}
				})
				.catch((err): void => {
					console.log(err);
					navigate("/error");
				});
		}
	};

	return (
		<div className="App d-flex justify-content-center align-items-center">
			<Form className="login-box p-4" onSubmit={handleSubmit}>
				<h1 className="text-center d-flex justify-content-center">
					<div className="headerText2">Code</div>
					<div className="headerText1">Crafter</div>
					<div className="headerText2">.</div>
				</h1>
				<hr className="mb-4" />
				<h6 className="text-center">Register</h6>

				{(!username || !password) && submit && (
					<Alert variant="warning">Username or password missing.</Alert>
				)}

				<Form.Group className="mb-3" controlId="formBasicText">
					<Form.Control
						type="text"
						placeholder="Username"
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button variant={currentButtonState()} type="submit" className="btn">
						Register
					</Button>
				</div>
			</Form>
		</div>
	);
}
