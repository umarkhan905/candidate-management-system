import type { CandidateAction, CandidateState } from "@/types/candidate";

export const candidateReducer = (
  state: CandidateState,
  action: CandidateAction
) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: { ...action.payload } };

    case "SET_ERROR":
      return {
        ...state,
        error: { ...action.payload },
      };

    case "SET_CANDIDATES":
      return {
        ...state,
        candidates: action.payload,
      };

    case "ADD_CANDIDATE":
      return {
        ...state,
        candidates: [...state.candidates, action.payload],
      };

    case "REMOVE_CANDIDATE":
      return {
        ...state,
        candidates: state.candidates.filter(
          (candidate) => candidate.id !== action.payload
        ),
      };

    case "UPDATE_CANDIDATE":
      return {
        ...state,
        candidates: state.candidates.map((candidate) =>
          candidate.id === action.payload.id
            ? { ...candidate, ...action.payload.updates }
            : candidate
        ),
      };

    default:
      return state;
  }
};
