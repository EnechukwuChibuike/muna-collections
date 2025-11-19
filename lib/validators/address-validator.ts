import { z } from "zod";

export const AddressSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  street: z.string().min(3, "Street address is required"),
  postal: z.string().min(2, "Postal code is required"),

  paymentMethod: z.enum(["paystack", "flutterwave", "cod"]),
});

export type AddressInput = z.infer<typeof AddressSchema>;
