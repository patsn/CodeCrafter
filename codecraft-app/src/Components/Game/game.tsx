import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContextData } from "../Context/Provider";

import SkillBar from "../SkillBar/SkillBar";
import NavBar from "../Navbar/navbar";

export default function GamePage(): JSX.Element {
	const { tokens, data } = useContextData();
	const navigate = useNavigate();

	useEffect((): void => {
		if (!tokens.accessToken || !tokens.refreshToken) {
			navigate("/"); // Use navigate to change the URL
		}
	}, [navigate, tokens.accessToken, tokens.refreshToken]);

	return (
		<div className="App customOverflow pb-5">
			{data && <NavBar data={data} />}
			{data.skills && <SkillBar skills={data.skills} />}
		</div>
	);
}
