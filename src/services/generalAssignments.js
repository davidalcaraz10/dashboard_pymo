import axios from "axios";
import { SERVER_HOST } from "../constants";

const generalAssignments = async function () {
  try {
    const response = await axios.get(`${SERVER_HOST}/assignments/generalAssignments`);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ generalAssignments ~ error:", error)
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export default generalAssignments;