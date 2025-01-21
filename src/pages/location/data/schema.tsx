import { z } from "zod";

export const locationSchema = z.object({
 id: z.string(),
 name: z.string(),
 address: z.string().nullable(),
 latitude: z
  .union([z.string().transform((val) => parseFloat(val)), z.number()])
  .optional(),
 longitude: z
  .union([z.string().transform((val) => parseFloat(val)), z.number()])
  .optional(),
 userId: z.string(),
 createdAt: z.string(),
 updatedAt: z.string(),
});

export type Location = z.infer<typeof locationSchema>;
