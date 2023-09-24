import { SHA256, enc } from "crypto-js";
import Vars from "./variables";

export function encrypt(data: string): string {
	const hash = SHA256(data + Vars.PRIVATE_KEY).toString(enc.Hex);
	return hash.substring(0, 32); // Limitando a 32 caracteres
}

export const getUniqueId = () => {
	return `${new Date().getTime()}`;
};
