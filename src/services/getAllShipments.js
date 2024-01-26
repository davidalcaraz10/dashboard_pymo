import axios from "axios";
import { SERVER_HOST } from "../constants";

const getShipments = async function () {
  try {
    const response = await axios.get(`${SERVER_HOST}/shipments/getAll`);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ getShipment ~ error:", error)
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export default getShipments;