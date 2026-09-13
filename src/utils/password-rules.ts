import { z } from 'zod';

export interface PasswordRule {
  id: string;
  label: string;
  test: (val: string) => boolean;
}

export const passwordRules: PasswordRule[] = [
  { id: 'length', label: 'Minimal 8 karakter', test: (val) => val.length >= 8 },
  { id: 'uppercase', label: 'Memiliki minimal 1 huruf besar (A-Z)', test: (val) => /[A-Z]/.test(val) },
  { id: 'lowercase', label: 'Memiliki minimal 1 huruf kecil (a-z)', test: (val) => /[a-z]/.test(val) },
  { id: 'number', label: 'Memiliki minimal 1 angka (0-9)', test: (val) => /[0-9]/.test(val) },
  { id: 'special', label: 'Memiliki minimal 1 karakter spesial (@$!%*?&)', test: (val) => /[@$!%*?&]/.test(val) },
];

export const PasswordSchema = z.string().superRefine((val, ctx) => {
  passwordRules.forEach((rule) => {
    if (!rule.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: rule.label,
      });
    }
  });
});