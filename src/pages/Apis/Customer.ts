// src/api/CustomerSupport.ts
import axios from "axios";

const API_URL = "https://fahadpervezbackend803d.onrender.com/api/v1/support/messages";

// send support message
export const sendSupportMessage = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
    return response;
  } catch (error: any) {
    console.error("Support message error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong!" };
  }
};
