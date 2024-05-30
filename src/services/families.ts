import axios from "axios";
import { apiBaseUrl } from '../constants';
import { Family } from "../../types";

const getAllFamilies = async() => {
    const { data } = await axios.get<Family[]>(
        `${apiBaseUrl}/families`
    );
    return data;
}

const addFamily = async(newFamily: Family) => {
    const { data } = await axios.post<Family>(
        `${apiBaseUrl}/families`,
        newFamily
    );
    return data;
}

export default {
    getAllFamilies,
    addFamily
}