import axios from "axios";
import { ContactFormInputs } from "../types/contact";
const getApiBase = () => {
  if (import.meta.env.PROD) {
    return 'https://claudygodwebapp-1.onrender.com';
  }
  return window.location.origin.includes('localhost') 
    ? 'http://localhost:10000' 
    : 'https://claudygodwebapp-1.onrender.com';
};
const API_BASE = getApiBase();
const CONTACT_ENDPOINT = `${API_BASE}/api/subscribers`;

export const submitContactForm = async (data: ContactFormInputs) => {
  try {
    const response = await axios.post(CONTACT_ENDPOINT, data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
// ContactApi.ts - Fix the error handling
if (axios.isAxiosError(error)) {
  if (error.response?.status === 400 && error.response.data?.errors) {
    const validationErrors = error.response.data.errors.reduce(
      (acc: Record<string, string>, err: any) => {
        // Use 'param' instead of 'path'
        acc[err.param] = err.msg;
        return acc;
      }, {}
    );
    throw { 
      name: 'ValidationError', 
      message: 'Please correct the form errors',
      errors: validationErrors
    };
  }
  throw new Error(error.response?.data?.message || "Submission failed");
}
    throw new Error("Unknown error occurred");
  }
};