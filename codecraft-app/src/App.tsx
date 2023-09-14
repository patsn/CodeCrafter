import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./Components/Login/login";
import ErrorPage from "./Components/Error/errorPage";
import HomePage from "./Components/Home/home";
import { DataProvider } from "./Components/Context/Provider";
import RegisterPage from "./Components/Register/register";

function App(): JSX.Element {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <LoginPage />,
		},
		{
			path: "/login",
			element: <LoginPage />,
		},
		{
			path: "/register",
			element: <RegisterPage />,
		},
		{
			path: "/home",
			element: <HomePage />,
		},
		{
			path: "/error",
			element: <ErrorPage />,
		},
		{
			path: "*",
			element: <ErrorPage />,
			// errorElement: <ErrorPage />,
		},
	]);
	return (
		<div className="App d-flex justify-content-center align-items-center">
			<DataProvider>
				<RouterProvider router={router} />
			</DataProvider>
		</div>
	);
}

export default App;
