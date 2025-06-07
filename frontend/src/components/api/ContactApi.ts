// src/api/contactService.ts
import { ContactFormInputs } from "../contact/ContactForm";


const API_URL = 'http://localhost:5000/api/contacts'

export const submitContactForm = async (data: ContactFormInputs) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Submission failed");
    }

    return await response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};