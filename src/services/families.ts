import axios from "axios";
import { apiBaseUrl } from '../constants';
import { Family } from "../../types";

/**
 * Fetches all families from the backend server.
 * @returns An array of Family objects.
 */
const getAllFamilies = async() => {
    const { data } = await axios.get<Family[]>(
        `${apiBaseUrl}/families`
    );
    return data;
}

/**
 * Adds a new family to the backend server.
 * @param newFamily The new family object to add.
 * @returns The newly added Family object.
 */
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