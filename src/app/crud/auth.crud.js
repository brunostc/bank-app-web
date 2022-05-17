import axios from "axios";
import { Constants } from '../utils/Constants';

export function login(email, password) {
	return axios.post(`${Constants.baseUrl}/login`, { email, password });
}

export function register(email, password, username) {
	return axios.post(`${Constants.baseUrl}/register`, { email, password, username });
}
