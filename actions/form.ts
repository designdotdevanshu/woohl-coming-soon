"use server";

import { connectToDatabase } from "@/lib/mongodb";
import FormData from "@/models/FormData";
import { FormDataType } from "@/types/FormData";
// import { redirect } from "next/navigation";

export async function submitFormAction(formData: FormDataType) {
  try {
    await connectToDatabase();

    const newEntry = new FormData(formData);
    await newEntry.save();

    return { success: true, message: "Form submitted successfully." };
  } catch (error) {
    console.error("Error saving form:", error);
    return { success: false, message: "Failed to submit form." };
  }
}

export async function getFormData() {
  try {
    await connectToDatabase();
    const data = await FormData.find();
    return data;
  } catch (error) {
    console.error("Error fetching form data:", error);
    return [];
  }
}

/**
 * Retrieves the total count of form entries from the database.
 *
 * @returns {Promise<number>} - The total number of form entries. Returns 0 in case of an error.
 */
export async function getFormEntriesCount(): Promise<number> {
  try {
    await connectToDatabase();
    const count = await FormData.countDocuments();
    return count;
  } catch (error) {
    console.error("Error fetching form entries count:", error);
    return 0;
  }
}
