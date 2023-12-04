import { z } from 'zod'
export const bookCreateSchema = z.object({
    name: z.string().min(1),
    price: z.number().min(0.01),
    category: z.string().min(3).array(),
    description: z.string().nullish(),
})

export const bookSchema = bookCreateSchema.extend({
    id: z.string().uuid(),
})

export const bookUpdateSchema = bookCreateSchema.partial().extend({
    id: z.string().uuid(),
})

export type TBook = z.infer<typeof bookSchema>
export type TBookCreateInput = z.infer<typeof bookCreateSchema>
export type TBookUpdateInput = z.infer<typeof bookUpdateSchema>
