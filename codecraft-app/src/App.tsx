import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./Components/Login/login";
import ErrorPage from "./Components/Error/errorPage";
import HomePage from "./Components/Home/home";
import RegisterPage from "./Components/Register/register";
import { DataProvider } from "./Components/Context/Provider";
import StatPage from "./Components/Stats/stats";

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
			path: "/stats",
			element: <StatPage />,
		},
		{
			path: "*",
			element: <ErrorPage />,
			// errorElement: <ErrorPage />,
		},
	]);
	return (
		<DataProvider>
			<RouterProvider router={router} />
		</DataProvider>
	);
}

export default App;
