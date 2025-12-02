import * as z from "zod";

export const addCandidateFormSchema = z.object({
  name: z.string().nonempty({ error: "Name is required" }),
  email: z.email().nonempty({ error: "Email is required" }),
  phone: z
    .string()
    .nonempty({ error: "Phone number is required" })
    .min(11, { error: "Phone number must be 11 digits long" })
    .regex(/^(\+92|0)?(3\d{2}|\d{3})(?:-?\d{3}-?\d{4})?$/, {
      error: "Invalid phone number format",
    }),
  city: z.string().nonempty({ error: "City is required" }),
  institute: z.string().nonempty({ error: "Institute is required" }),
  educationLevel: z.string().nonempty({ error: "Degree is required" }),
  graduationYear: z.string().nonempty({ error: "Graduation year is required" }),
  currentPosition: z
    .string()
    .nonempty({ error: "Current position is required" }),
  currentCompany: z.string().nonempty({ error: "Current company is required" }),
  experienceYears: z.string().nonempty({ error: "Experience is required" }),
  noticePeriod: z.string().nonempty({ error: "Noticed period  is required" }),
  reasonToSwitch: z.string(),
  currentSalary: z.string().nonempty({ error: "Current salary is required" }),
  expectedSalary: z.string().nonempty({ error: "Expected salary is required" }),
  appliedPosition: z
    .string()
    .nonempty({ error: "Applied position is required" }),
  loomLink: z.string().optional(),
});

export type IAddCandidateFormSchema = z.infer<typeof addCandidateFormSchema>;
