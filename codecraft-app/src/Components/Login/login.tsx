import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useContextData } from "../Context/Provider";

export default function LoginPage(): JSX.Element {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [submit, setSubmit] = useState<boolean>(false);
	const [wrongCredentials, setWrongCredentials] = useState<boolean>(false);
	const navigate: NavigateFunction = useNavigate();
	const { setTokens } = useContextData();
	enum ButtonState {
		green = "success",
		red = "danger",
	}

	useEffect((): void => {
		if (window.localStorage.getItem("accessToken") && window.localStorage.getItem("refreshToken")) {
			axios
				.post("http://localhost:3001/refreshAccess", {
					refreshToken: window.localStorage.getItem("refreshToken"),
				})
				.then((res): void => {
					if (res.data.accessToken) {
						setTokens({ accessToken: res.data.accessToken, refreshToken: window.localStorage.getItem("refreshToken") as string });
						window.localStorage.setItem("accessToken", res.data.accessToken);
						navigate("/home"); // Use navigate to change the URL
					}
				})
				.catch((err): void => {
					console.log(err);
					navigate("/");
				});
		} else {
			navigate("/");
		}
	}, [navigate, setTokens]);

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
				.post("http://localhost:3001/login", { username, password })
				.then((res): void => {
					if (res.data.accessToken && res.data.refreshToken) {
						setTokens({ accessToken: res.data.accessToken, refreshToken: res.data.refreshToken });
						window.localStorage.setItem("accessToken", res.data.accessToken);
						window.localStorage.setItem("refreshToken", res.data.refreshToken);
						navigate("/home"); // Use navigate to change the URL
					} else {
						setWrongCredentials(true);
					}
				})
				.catch((err): void => {
					console.log(err);
					setWrongCredentials(true);
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
				<h6 className="text-center">Login</h6>

				{(!username || !password) && submit && <Alert variant="warning">Username or password missing.</Alert>}
				{wrongCredentials && <Alert variant="danger">Wrong username or password.</Alert>}

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

				<div className="d-flex justify-content-between">
					<Button
						variant="warning"
						onClick={() => {
							navigate("/register");
						}}>
						Register
					</Button>
					<Button variant={currentButtonState()} type="submit" className="btn">
						Login
					</Button>
				</div>
			</Form>
		</div>
	);
}
