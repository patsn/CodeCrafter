import { Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../Interfaces/user";

export default function NavBar(props: { data: User }): JSX.Element {
	const navigate = useNavigate();
	return (
		<Navbar
			className="bg-body-tertiary"
			expand="md"
			fixed="top"
			data-bs-theme="dark"
			sticky="top">
			<Navbar.Brand className="d-flex px-3">
				<div className="headerText2">Code</div>
				<div className="headerText1 white">Crafter</div>
				<div className="headerText2">.</div>
			</Navbar.Brand>
			<Navbar.Toggle className="me-2" />
			<Navbar.Collapse className="px-3">
				<Nav className="me-auto">
					{/* <Nav.Link href="/home">Home</Nav.Link> */}
					<Nav.Link onClick={() => navigate("/track")}>Time tracking</Nav.Link>
					<Nav.Link onClick={() => navigate("/stats")}>Stats</Nav.Link>
				</Nav>
				<div className="pr-3 d-flex justify-content-end">
					<Navbar.Text className="mx-2">
						Hey, {props.data.username}!
					</Navbar.Text>
					<Button
						variant="outline-danger"
						onClick={() => {
							axios.delete("http://localhost:3001/logout", {
								data: {
									refreshToken: window.localStorage.getItem(
										"refreshToken",
									) as string,
								},
							});

							window.localStorage.removeItem("accessToken");
							window.localStorage.removeItem("refreshToken");
							navigate("/");
						}}>
						Logout
					</Button>
				</div>
			</Navbar.Collapse>
		</Navbar>
	);
}
