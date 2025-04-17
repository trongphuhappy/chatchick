import z from 'zod'

export const EmailBody = z.object({
    email: z.string().email(),
})

export type EmailBodyType = z.TypeOf<typeof EmailBody>

export const FullNameBody = z.object({
    fullName: z.string().trim().min(2).max(256),
})

export type FullNameBodyType = z.TypeOf<typeof FullNameBody>

export const BiographyBody = z.object({
    biography: z.string().trim().max(256),
})

export type BiographyBodyType = z.TypeOf<typeof BiographyBody>
