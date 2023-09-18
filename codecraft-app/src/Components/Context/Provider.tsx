import React, { useState, useContext, useEffect } from "react";
import { User } from "../../Interfaces/user";
import { Tokens } from "../../Interfaces/tokens";
import axios from "axios";
import { isExpired } from "react-jwt";

//Context interface
interface ContextInterface {
	tokens: Tokens;
	setTokens: React.Dispatch<React.SetStateAction<Tokens>>;
	data: User;
	setData: React.Dispatch<React.SetStateAction<User>>;
}

//Create context
const Context = React.createContext<ContextInterface>(
	{} as ContextInterface, // Provide a default value for TypeScript
);

//Export context hook
export const useContextData = () => useContext<ContextInterface>(Context);

//Export context provider
export const DataProvider = ({ children }: any) => {
	const [tokens, setTokens] = useState<Tokens>({
		accessToken: "",
		refreshToken: "",
	});
	const [data, setData] = useState<User>({ username: "", skills: [] });

	useEffect(() => {
		if (
			!isExpired(tokens.accessToken) &&
			tokens.accessToken &&
			data.username !== ""
		) {
			axios
				.post("http://localhost:3001/commitData", data, {
					headers: {
						Authorization: "Bearer " + tokens.accessToken,
					},
				})
				.catch((err): void => {
					console.log(err);
				});
		}
		if (
			isExpired(tokens.accessToken) &&
			tokens.refreshToken !== "" &&
			data.username !== ""
		) {
			// console.log("refreshing");
			axios
				.post("http://localhost:3001/refreshAccess", {
					refreshToken: tokens.refreshToken,
				})
				.then((res): void => {
					if (res.data.accessToken) {
						setTokens({
							accessToken: res.data.accessToken,
							refreshToken: tokens.refreshToken,
						});
						window.localStorage.setItem("accessToken", res.data.accessToken);
					}
				})
				.then(() => {
					if (!isExpired(tokens.accessToken) && tokens.accessToken) {
						axios
							.post("http://localhost:3001/commitData", data, {
								headers: {
									Authorization: "Bearer " + tokens.accessToken,
								},
							})
							.catch((err): void => {
								console.log(err);
							});
					}
				})
				.catch((err): void => {
					console.log(err);
				});
			if (isExpired(tokens.refreshToken)) {
				setTokens({ accessToken: "", refreshToken: "" });
				window.localStorage.removeItem("accessToken");
				window.localStorage.removeItem("refreshToken");
			}
		}
	}, [data, tokens]);

	return (
		<Context.Provider value={{ tokens, setTokens, data, setData }}>
			{children}
		</Context.Provider>
	);
};
