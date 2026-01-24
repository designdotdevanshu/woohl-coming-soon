"use server";

import { connectToDatabase } from "@/lib/mongodb";
import CustomerData from "@/models/CustomerData";
import { CustomerDataType } from "@/types/CustomerData";

export async function submitCustomerWaitlistAction(data: CustomerDataType) {
  try {
    await connectToDatabase();

    // Check if email already exists
    const existing = await CustomerData.findOne({ email: data.email });
    if (existing) {
      return { success: false, message: "This email is already on our waitlist." };
    }

    const newEntry = new CustomerData(data);
    await newEntry.save();

    return { success: true, message: "You've been added to the waitlist." };
  } catch (error) {
    console.error("Error saving customer waitlist:", error);
    return { success: false, message: "Failed to join waitlist. Please try again." };
  }
}

export async function getCustomerWaitlistCount(): Promise<number> {
  try {
    await connectToDatabase();
    const count = await CustomerData.countDocuments();
    return count;
  } catch (error) {
    console.error("Error fetching customer waitlist count:", error);
    return 0;
  }
}
