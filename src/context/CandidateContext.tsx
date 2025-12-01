import type { CandidateState } from "@/types/candidate";
import { createContext, use, useReducer, type ReactNode } from "react";
import { candidateReducer } from "./candidate-reducer";
import { CANDIDATE_STORAGE_KEY, INITIAL_STATE } from "@/constants/candidate";
import { CandidateService } from "@/services/candidateService";
import { StorageService } from "@/services/storageService";

interface ICandidateContext {
  state: CandidateState;
  service: CandidateService;
}

const CandidateContext = createContext<ICandidateContext | undefined>(
  undefined
);

export const CandidateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(candidateReducer, INITIAL_STATE);

  const storageService = new StorageService(CANDIDATE_STORAGE_KEY);
  const candidateService = new CandidateService(dispatch, storageService);

  const value = { state, service: candidateService };

  return (
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidates = () => {
  const context = use(CandidateContext);
  if (!context) {
    throw new Error("useCandidates must be used within CandidateProvider");
  }
  return context;
};
