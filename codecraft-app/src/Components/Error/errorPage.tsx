export default function ErrorPage(): JSX.Element {
	return (
		<div className="login-box p-4 text-center">
			<h1 className="d-flex justify-content-center">
				<div className="headerText2">Code</div>
				<div className="headerText1">Crafter</div>
				<div className="headerText2">.</div>
			</h1>
			<hr className="mb-4" />
			<h2>Oops!</h2>
			<p>Sorry, an unexpected error has occurred.</p>
		</div>
	);
}
