import React from "react";
import type {
  Candidate,
  CandidateAction,
  CandidateError,
  CandidateFilters,
  CandidateLoading,
} from "@/types/candidate";
import type { StorageService } from "./storageService";
import { wait } from "@/utils/wait";

export class CandidateService {
  private dispatch: React.Dispatch<CandidateAction>;
  private storage: StorageService;

  constructor(
    dispatch: React.Dispatch<CandidateAction>,
    storage: StorageService
  ) {
    this.dispatch = dispatch;
    this.storage = storage;
  }

  private setLoading(payload: CandidateLoading) {
    this.dispatch({ type: "SET_LOADING", payload });
  }

  private setError(payload: CandidateError) {
    this.dispatch({ type: "SET_ERROR", payload });
  }

  private generateRandomId() {
    return Date.now().toString();
  }

  async getAllCandidates() {
    this.setLoading({ type: "SET", active: true });
    this.setError({ type: "SET", message: null });
    try {
      // Simulating delay like API
      await wait(1000);

      const candidates = this.storage.getData<Candidate[]>([]);
      this.dispatch({ type: "SET_CANDIDATES", payload: candidates });
    } catch (error) {
      this.setError({ type: "SET", message: (error as Error).message });
    } finally {
      this.setLoading({ type: "SET", active: false });
    }
  }

  async getCandidateById(id: string): Promise<Candidate | null> {
    this.setLoading({ type: "GET_BY_ID", active: true });
    this.setError({ type: "GET_BY_ID", message: null });
    try {
      // Simulating delay like API
      await wait(300);

      const candidates = this.storage.getData<Candidate[]>([]);
      const candidate = candidates.find((candidate) => candidate.id === id);

      if (!candidate) return null;

      return candidate;
    } catch (error) {
      this.setError({ type: "GET_BY_ID", message: (error as Error).message });
      return null;
    } finally {
      this.setLoading({ type: "GET_BY_ID", active: false });
    }
  }

  async addCandidate(
    candidate: Omit<Candidate, "id" | "createdAt" | "updatedAt" | "status">
  ) {
    this.setLoading({ type: "ADD", active: true });
    this.setError({ type: "ADD", message: null });
    try {
      // Simulating delay like API
      await wait(300);

      const candidates = this.storage.getData<Candidate[]>([]);
      const newCandidate: Candidate = {
        id: this.generateRandomId(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        status: "New",
        ...candidate,
      };
      candidates.push(newCandidate);
      this.storage.setData(candidates);

      this.dispatch({ type: "ADD_CANDIDATE", payload: newCandidate });
    } catch (error) {
      this.setError({ type: "ADD", message: (error as Error).message });
    } finally {
      this.setLoading({ type: "ADD", active: false });
    }
  }

  async updateCandidate(id: string, updates: Partial<Candidate>) {
    this.setLoading({ type: "UPDATE", active: true });
    this.setError({ type: "UPDATE", message: null });
    try {
      // Simulating delay like API
      await wait(300);

      let candidates = this.storage.getData<Candidate[]>([]);
      candidates = candidates.map((candidate) =>
        candidate.id === id ? { ...candidate, ...updates } : candidate
      );
      this.storage.setData(candidates);

      this.dispatch({ type: "UPDATE_CANDIDATE", payload: { id, updates } });
    } catch (error) {
      this.setError({ type: "UPDATE", message: (error as Error).message });
    } finally {
      this.setLoading({ type: "UPDATE", active: false });
    }
  }

  async deleteCandidate(id: string) {
    this.setLoading({ type: "DELETE", active: true });
    this.setError({ type: "DELETE", message: null });
    try {
      // Simulating delay like API
      await wait(300);

      let candidates = this.storage.getData<Candidate[]>([]);
      candidates = candidates.filter((candidate) => candidate.id !== id);
      this.storage.setData(candidates);

      this.dispatch({ type: "REMOVE_CANDIDATE", payload: id });
    } catch (error) {
      this.setError({ type: "DELETE", message: (error as Error).message });
    } finally {
      this.setLoading({ type: "DELETE", active: false });
    }
  }

  searchAndFilterCandidates(filters: CandidateFilters) {
    const candidates = this.storage.getData<Candidate[]>([]);
    let filteredCandidates = candidates;

    const searchQuery = filters.searchQuery?.toLowerCase() ?? "";
    const status = filters.status?.toLowerCase();
    const appliedPosition = filters.appliedPosition?.toLowerCase();
    const minExperience = filters.minExperience;
    const maxExperience = filters.maxExperience;

    if (searchQuery)
      filteredCandidates = filteredCandidates.filter((candidate) => {
        return (
          candidate.name.toLowerCase().includes(searchQuery) ||
          candidate.email.toLowerCase().includes(searchQuery) ||
          candidate.appliedPosition.toLowerCase().includes(searchQuery)
        );
      });

    if (status) {
      filteredCandidates = filteredCandidates.filter(
        (candidate) => candidate.status.toLowerCase() === status
      );
    }

    if (appliedPosition) {
      filteredCandidates = filteredCandidates.filter(
        (candidate) =>
          candidate.appliedPosition.toLowerCase() === appliedPosition
      );
    }

    if (
      minExperience &&
      minExperience >= 0 &&
      maxExperience &&
      maxExperience > 0
    ) {
      filteredCandidates = filteredCandidates.filter(
        (candidate) =>
          candidate.experienceYears >= minExperience &&
          candidate.experienceYears <= maxExperience
      );
    }

    return filteredCandidates;
  }
}
