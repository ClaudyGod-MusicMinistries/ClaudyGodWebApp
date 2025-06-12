// src/api/contactService.ts
import { ContactFormInputs } from "../contact/ContactForm";

const API_BASE = process.env.API_URL || 5000;;
const CONTACT_ENDPOINT = `${API_BASE}/api/contacts`;

export const submitContactForm = async (data: ContactFormInputs) => {
  try {
    const response = await fetch(`${CONTACT_ENDPOINT}`, {
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