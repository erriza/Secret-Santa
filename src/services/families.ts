import axios from "axios";
import { apiBaseUrl } from '../constants';
import { Family } from "../../types";

const getAllFamilies = async() => {
    const { data } = await axios.get<Family[]>(
        `${apiBaseUrl}/families`
    );
    return data;
}

export default {
    getAllFamilies
}