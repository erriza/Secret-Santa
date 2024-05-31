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

/**
 * Remove a member of a family to the backend server.
 * @param familyId The Id of the family to delete
 * @param memberId The Id of the memeber to delete
 * @returns The response of the status code
 */
const removeMember = async (familyId: string, memberId: string) => { 
    await axios.delete(`${apiBaseUrl}/families/${familyId}/members/${memberId}`); 
};


const addFamilyOrMember = async (data: { familyName: string; memberName: string }): Promise<{ message: string; family: Family }> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data: response } = await axios.post<{ message: string; family: Family }>(`${apiBaseUrl}/families`, data); // Update the response type
      return response;
    } catch (error) {
      throw error;
    }
  };

export default {
    getAllFamilies,
    addFamily,
    removeMember,
    addFamilyOrMember

}