import * as z from "zod";

export const addCandidateFormSchema = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  city: z.string(),
  institute: z.string(),
  educationLevel: z.string(),
  graduationYear: z.string(),
  currentPosition: z.string(),
  currentCompany: z.string(),
  experienceYears: z.string(),
  noticePeriod: z.string(),
  reasonToSwitch: z.string(),
  currentSalary: z.string(),
  expectedSalary: z.string(),
  appliedPosition: z.string(),
  loomLink: z.string().optional(),
});

export type IAddCandidateFormSchema = z.infer<typeof addCandidateFormSchema>;
