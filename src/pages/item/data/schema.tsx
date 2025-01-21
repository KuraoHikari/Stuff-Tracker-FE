import { z } from "zod";

const cuidRegex = /^c[^\s-]{8,}$/;

export const itemSchema = z.object({
 id: z.string(),
 name: z.string().min(1).max(100),
 description: z.string().max(255).optional(),
 purchasePrice: z
  .union([z.string().transform((val) => parseFloat(val)), z.number()])
  .optional(),
 sellPrice: z
  .union([z.string().transform((val) => parseFloat(val)), z.number()])
  .optional(),
 estimatedValue: z
  .union([z.string().transform((val) => parseFloat(val)), z.number()])
  .optional(),
 purchaseDate: z
  .union([z.string().transform((val) => new Date(val)), z.date()])
  .optional(),
 expiredDate: z
  .union([z.string().transform((val) => new Date(val)), z.date()])
  .optional(),
 categoryId: z
  .string()
  .refine((val) => cuidRegex.test(val), { message: "Invalid CUID" })
  .optional(),
 image: z.string().url().optional(),
 conditionId: z.string().optional(),
 statusId: z.string().optional(),
 locationId: z.string().optional(),
});

export type Item = z.infer<typeof itemSchema>;
