import { z } from 'zod';

export const RegisterSchema = z.object({
  id: z.uuid().optional(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  password: z
    .string()
    .min(6, {
      message: 'password must be at least 6 characters',
    })
    .max(30),
  confirm_password: z
    .string()
    .min(6, {
      message: 'password must be at least 6 characters',
    })
    .max(30),
});

export const CreateAccountSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  email: z.string(),
  address: z.string(),
});

export type CreateAccount = z.infer<typeof CreateAccountSchema>;
