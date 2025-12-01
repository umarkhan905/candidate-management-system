import { useCandidates } from "@/context/CandidateContext";
import type {
  CandidateStatus,
  CandidateFilters as Filters,
} from "@/types/candidate";
import type React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { File, Import, Search } from "lucide-react";
import { CANDIDATE_EXPERIENCES, CANDIDATE_STATUS } from "@/constants/candidate";
import type { ChangeEvent } from "react";
import { AddCandidateModal } from "../add-candidate-modal";
import { Button } from "@/components/ui/button";

interface CandidateFiltersProps {
  filters: Filters;
  onFilterChange: React.Dispatch<React.SetStateAction<Filters>>;
}

export const CandidateFilters = ({
  filters,
  onFilterChange,
}: CandidateFiltersProps) => {
  const { state } = useCandidates();

  const positions = Array.from(
    new Set(state.candidates.map((c) => c.appliedPosition))
  ).sort();

  const handlePositionChange = (position: string) => {
    onFilterChange({
      ...filters,
      appliedPosition: position === "all" ? undefined : position,
    });
  };

  const handleExperienceChange = (value: string) => {
    if (value === "all") {
      onFilterChange({
        ...filters,
        minExperience: undefined,
        maxExperience: undefined,
      });
    } else {
      const [min, max] = value.split("-").map(Number);
      onFilterChange({
        ...filters,
        minExperience: min,
        maxExperience: max,
      });
    }
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({
      ...filters,
      status: value === "all" ? undefined : (value as CandidateStatus),
    });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Import />
            Import CSV
          </Button>
          <Button variant="outline">
            <File />
            Export
          </Button>
        </div>

        <AddCandidateModal />
      </div>

      <div className="relative">
        <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2" />
        <Input
          placeholder="Search by name, email, or position..."
          value={filters.searchQuery || ""}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
        <Select
          value={filters.appliedPosition || "all"}
          onValueChange={handlePositionChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Positions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Positions</SelectItem>
            {positions.map((position) => (
              <SelectItem key={position} value={position}>
                {position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status || "all"}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {CANDIDATE_STATUS.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={
            filters.minExperience === undefined
              ? "all"
              : `${filters.minExperience}-${filters.maxExperience || 100}`
          }
          onValueChange={handleExperienceChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Experience Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Experience</SelectItem>
            {CANDIDATE_EXPERIENCES.map((experience, index) => (
              <SelectItem
                key={index}
                value={`${experience.min}-${experience.max}`}
              >
                {experience.min < 9
                  ? `${experience.min}-${experience.max}`
                  : "10+"}{" "}
                Years
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
