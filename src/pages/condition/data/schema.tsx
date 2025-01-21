import { z } from "zod";

export const conditionSchema = z.object({
 id: z.string(),
 name: z.string(),
 description: z.string().nullable(),
 userId: z.string(),
 createdAt: z.string(),
 updatedAt: z.string(),
});

export type Condition = z.infer<typeof conditionSchema>;
