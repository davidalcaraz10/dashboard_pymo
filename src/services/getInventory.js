import axios from "axios";
import { SERVER_HOST } from "../constants";

const getInventory = async function () {
  try {
    const response = await axios.get(`${SERVER_HOST}/inventory/getAll`);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error)
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export default getInventory;