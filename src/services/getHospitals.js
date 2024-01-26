import axios from "axios";
import { SERVER_HOST } from "../constants";

const getHospitals = async function() {
  try {
    const response = await axios.get(`${SERVER_HOST}/hospitals/getHospitals`);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error)
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export default getHospitals;