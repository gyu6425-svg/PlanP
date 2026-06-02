import { z } from 'zod';

export function parseBody(schema, body, res, fallbackMessage) {
  const result = schema.safeParse(body ?? {});

  if (!result.success) {
    res.status(400).json({ message: fallbackMessage });
    return null;
  }

  return result.data;
}

const optionalString = z
  .string()
  .trim()
  .optional()
  .transform((value) => value || undefined);

export const signupSchema = z.object({
  loginId: z.string().trim().min(1),
  password: z.string().min(6),
  name: z.string().trim().min(1),
  birthYear: z.string().trim().min(1),
  birthMonth: z.string().trim().min(1),
  birthDay: z.string().trim().min(1),
  email: optionalString,
});

export const loginSchema = z.object({
  loginId: z.string().trim().min(1),
  password: z.string().min(1),
});

export const favoriteSchema = z.object({
  itemId: z.string().trim().min(1),
  itemType: z.string().trim().min(1),
  categoryLabel: z.string().trim().min(1),
  title: z.string().trim().min(1),
  subtitle: optionalString,
  price: optionalString,
  policy: optionalString,
  image: optionalString,
  brand: optionalString,
  href: optionalString,
  payload: z.unknown().optional(),
});

export const surveyResultSchema = z.object({
  cityCode: z.string().trim().min(1).transform((value) => value.toLowerCase()),
  answers: z.record(z.string(), z.unknown()),
  resultType: optionalString,
});

export const bookingClickSchema = z.object({
  cityCode: z.string().trim().min(1).transform((value) => value.toLowerCase()),
  itemType: z.string().trim().min(1).transform((value) => value.toLowerCase()),
  itemId: optionalString,
  itemTitle: z.string().trim().min(1),
  platform: z.string().trim().min(1),
  href: z.string().trim().min(1),
  sectionLabel: optionalString,
});
