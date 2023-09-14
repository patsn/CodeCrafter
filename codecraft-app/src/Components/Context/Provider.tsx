import React, { useState, useContext } from "react";
import { User } from "../../Interfaces/user";
import { Tokens } from "../../Interfaces/tokens";

//Context interface
interface ContextInterface {
	tokens: Tokens;
	setTokens: React.Dispatch<React.SetStateAction<Tokens>>;
	data: User;
	setData: React.Dispatch<React.SetStateAction<User>>;
}

//Create context
const Context = React.createContext<ContextInterface>(
	{} as ContextInterface // Provide a default value for TypeScript
);

//Export context hook
export const useContextData = () => useContext<ContextInterface>(Context);

//Export context provider
export const DataProvider = ({ children }: any) => {
	const [tokens, setTokens] = useState<Tokens>({ accessToken: "", refreshToken: "" });
	const [data, setData] = useState<User>({ username: "", skills: [] });

	return <Context.Provider value={{ tokens, setTokens, data, setData }}>{children}</Context.Provider>;
};
