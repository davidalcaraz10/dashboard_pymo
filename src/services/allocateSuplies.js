import axios from "axios";
import { SERVER_HOST } from "../constants";

const allocateSupplies = async function (data) {
  try {
    const response = await axios.post(`${SERVER_HOST}/assignments/allocateSupplies`, data);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error)
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export default allocateSupplies;