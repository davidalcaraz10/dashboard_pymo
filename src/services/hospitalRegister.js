import axios from "axios";
import { SERVER_HOST } from "../constants";

const hospitalRegister = async function (data) {
  try {
    const response = await axios.put(`${SERVER_HOST}/hospitals/register`, data);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error)
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export default hospitalRegister;