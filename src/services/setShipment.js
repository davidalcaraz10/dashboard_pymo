import axios from "axios";
import { SERVER_HOST } from "../constants";

const setShipment = async function (data) {
  try {
    const response = await axios.put(`${SERVER_HOST}/shipments/setNew`, data);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ setShipment ~ error:", error)
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export default setShipment;