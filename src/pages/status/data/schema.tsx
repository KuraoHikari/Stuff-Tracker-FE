import { z } from "zod";

export const statusSchema = z.object({
 id: z.string(),
 name: z.string(),
 description: z.string().nullable(),
 userId: z.string(),
 createdAt: z.string(),
 updatedAt: z.string(),
});

export type Status = z.infer<typeof statusSchema>;
