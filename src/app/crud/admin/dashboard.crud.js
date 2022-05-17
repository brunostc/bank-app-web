import axios from "axios";
import { Constants } from '../../utils/Constants';

export function getDashboard() {
  return axios.get(`${Constants.baseUrlAdmin}/balance`);
}
