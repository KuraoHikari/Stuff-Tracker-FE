import { z } from "zod";

export const categorySchema = z.object({
 id: z.string(),
 name: z.string(),
 description: z.string().nullable(),
 userId: z.string(),
 createdAt: z.string(),
 updatedAt: z.string(),
});

export type Category = z.infer<typeof categorySchema>;
