import axios from "axios";
import { SERVER_HOST } from "../constants";

const getAssignments = async function (hospitalId) {
  try {
    const response = await axios.get(`${SERVER_HOST}/assignments/getAssignments/${hospitalId}`,);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ getAssignments ~ error:", error)
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export default getAssignments;