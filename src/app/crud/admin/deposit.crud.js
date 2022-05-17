
import axios from "axios";
import { Constants } from '../../utils/Constants';

export function getDataTable() {
	return axios.get(`${Constants.baseUrlAdmin}/deposit/list/pending`);
}

export function approve(id) {
	return axios.post(`${Constants.baseUrlAdmin}/deposit/${id}/approve`);
}

export function reprove(id) {
	return axios.post(`${Constants.baseUrlAdmin}/deposit/${id}/reprove`);
}
