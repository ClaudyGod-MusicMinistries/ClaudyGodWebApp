// ContactApi.ts
import axios from 'axios'; // Use axios instead of fetch
import { ContactFormInputs } from "../types/contact";


const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000';
const CONTACT_ENDPOINT = `${API_BASE}/api/contacts`;

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