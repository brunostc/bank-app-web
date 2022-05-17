
import axios from "axios";
import { Constants } from '../utils/Constants';

export function getDataTable() {
	return axios.get(`${Constants.baseUrl}/transaction/list`);
}
