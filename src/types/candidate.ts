export interface Candidate {
  // Auto-generated
  id: string;
  createdAt: number;
  updatedAt: number;

  // Basic Info
  name: string;
  email: string;
  phone: string;
  city: string;

  // Education
  institute: string;
  educationLevel: "Bachelor" | "Master" | "PhD" | "Other";
  graduationYear: number;

  // Professional
  currentPosition: string;
  currentCompany: string;
  experienceYears: number;
  noticePeriod: string;
  reasonToSwitch: string;

  // Compensation
  currentSalary: number;
  expectedSalary: number;
  expectedSalaryPartTime?: number;

  // Job Application
  appliedPosition: string;

  // Files
  resumeFile?: string; // base64
  resumeFileName?: string;
  resumeFileType?: "pdf" | "docx";
  loomLink?: string;

  // Evaluation
  hrRemarks?: string;
  interviewerRemarks?: string;
  status: "New" | "Screening" | "Interviewed" | "Pass" | "Fail" | "On Hold";
}

export type CandidateStatus = Candidate["status"];
export type CandidateEducation = Candidate["educationLevel"];
export type CandidateResumeFileType = Candidate["resumeFile"];
export type CandidateLoadingType =
  | "ADD"
  | "SET"
  | "UPDATE"
  | "DELETE"
  | "GET_BY_ID";
export type CandidateErrorType =
  | "ADD"
  | "SET"
  | "UPDATE"
  | "DELETE"
  | "GET_BY_ID";
export interface CandidateError {
  type: CandidateErrorType | null;
  message: string | null;
}
export interface CandidateLoading {
  type: CandidateLoadingType | null;
  active: boolean;
}
export interface CandidateState {
  candidates: Candidate[];
  error: CandidateError;
  loading: CandidateLoading;
}
export type CandidateAction =
  | { type: "SET_LOADING"; payload: CandidateLoading }
  | { type: "SET_ERROR"; payload: CandidateError }
  | { type: "SET_CANDIDATES"; payload: Candidate[] }
  | { type: "ADD_CANDIDATE"; payload: Candidate }
  | { type: "REMOVE_CANDIDATE"; payload: Candidate["id"] }
  | {
      type: "UPDATE_CANDIDATE";
      payload: { id: string; updates: Partial<Candidate> };
    };

export type CandidateDispatch = (action: CandidateAction) => void;
export interface CandidateFilters {
  status?: CandidateStatus;
  appliedPosition?: string;
  minExperience?: number;
  maxExperience?: number;
  searchQuery?: string;
}
export type RemarksType = "HR" | "Interviewer";
