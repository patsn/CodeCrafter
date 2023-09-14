import { useContextData } from "../Context/Provider";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function HomePage(): JSX.Element {
	const { tokens, data, setData } = useContextData();
	const navigate = useNavigate();
	// const [data, setData] = useState<any>([{ username: "unknown", skills: [] }]); // [] is the initial value of the state variable data

	useEffect((): void => {
		if (!tokens.accessToken || !tokens.refreshToken) {
			navigate("/"); // Use navigate to change the URL
		} else {
			axios
				.get("http://localhost:3001/getData", {
					headers: {
						Authorization: "Bearer " + tokens.accessToken,
					},
				})
				.then((res): void => {
					setData(res.data[0]);
				})
				.catch((err): void => {
					console.log(err);
				});
		}
	}, [navigate, tokens.accessToken, tokens.refreshToken, setData]);

	return (
		<div className="login-box p-4 text-center">
			<h1 className="d-flex justify-content-center">
				<div className="headerText2">Code</div>
				<div className="headerText1">Crafter</div>
				<div className="headerText2">.</div>
			</h1>
			<hr className="mb-4" />
			<h2>Welcome Back!</h2>
			<h3>{data.username}</h3>
			<p>Noice.</p>
			<Button
				variant="danger"
				onClick={() => {
					axios.delete("http://localhost:3001/logout", {
						data: {
							refreshToken: window.localStorage.getItem("refreshToken") as string,
						},
					});

					window.localStorage.removeItem("accessToken");
					window.localStorage.removeItem("refreshToken");
					navigate("/");
				}}>
				Logout
			</Button>
		</div>
	);
}
