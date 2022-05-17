
import axios from "axios";
import { Constants } from '../utils/Constants';

export function getDataTable() {
	return axios.get(`${Constants.baseUrl}/deposit/list`);
}

export function store(form) {
	return axios.post(`${Constants.baseUrl}/deposit`, form);
}
