import type { CandidateState } from "@/types/candidate";

export const INITIAL_STATE: CandidateState = {
  candidates: [],
  error: { type: null, message: null },
  loading: { type: null, active: false },
};

export const CANDIDATE_ACTIONS = {
  // Candidate
  SET_CANDIDATES: "SET_CANDIDATES",
  ADD_CANDIDATE: "ADD_CANDIDATE",
  REMOVE_CANDIDATE: "REMOVE_CANDIDATE",
  UPDATE_CANDIDATE: "UPDATE_CANDIDATE",

  // Loading
  SET_LOADING: "SET_LOADING",

  // Error
  SET_ERROR: "SET_ERROR",
};

export const CANDIDATE_STORAGE_KEY = "candidate-storage";

export const INITIAL_ADD_CANDIDATE_FORM_DATA = {
  name: "",
  email: "",
  phone: "",
  city: "",
  institute: "",
  educationLevel: "Bachelor",
  graduationYear: new Date().getFullYear().toString(),
  currentPosition: "",
  currentCompany: "",
  experienceYears: "",
  noticePeriod: "",
  reasonToSwitch: "",
  currentSalary: "",
  expectedSalary: "",
  appliedPosition: "",
  loomLink: "",
  resumeFile: "",
};

export const CANDIDATE_STATUS = [
  "New",
  "Screening",
  "Interviewed",
  "Pass",
  "Fail",
  "On Hold",
] as const;

export const CANDIDATE_EXPERIENCES = [
  {
    min: 0,
    max: 2,
  },
  {
    min: 3,
    max: 5,
  },
  {
    min: 6,
    max: 10,
  },
  {
    min: 10,
    max: 100,
  },
];
