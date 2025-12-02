import { CandidateFilters as Filters } from "@/components/candidate-list/candidate-filters";
import { CandidateTable } from "@/components/candidate-list/candidate-table";
import { Navbar } from "@/components/candidate-list/navbar";
import { Button } from "@/components/ui/button";
import { CANDIDATES_PER_PAGE } from "@/constants/candidate";
import { useCandidates } from "@/context/CandidateContext";
import { usePaginate } from "@/hooks/usePaginate";
import type { CandidateFilters } from "@/types/candidate";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const CandidateList = () => {
  const { service, state } = useCandidates();
  const [filters, setFilters] = useState<CandidateFilters>({});

  const filteredCandidates = useMemo(
    () => service.searchAndFilterCandidates(filters),
    [filters, service]
  );

  const {
    data: candidates,
    hasMore,
    currentPage,
    noOfPages,
    onPrev,
    onNext,
  } = usePaginate(filteredCandidates, CANDIDATES_PER_PAGE);

  useEffect(() => {
    service.getAllCandidates();
  }, []);

  if (state.loading.type === "SET" && state.loading.active) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-muted/30 min-h-[calc(100vh-112px)]">
        <div className="space-y-5 sm:space-y-6 mx-auto px-4 sm:px-6 py-6 sm:py-8 container">
          <div className="bg-card shadow-sm p-4 sm:p-6 border border-border rounded-lg">
            <Filters filters={filters} onFilterChange={setFilters} />
          </div>

          <CandidateTable candidates={candidates} />

          <div className="flex justify-between items-center">
            <p className="text-muted-foreground text-sm">
              Showing {currentPage} of {noOfPages} page
            </p>

            <div className="flex gap-2">
              <Button onClick={onPrev} disabled={currentPage <= 1}>
                <ChevronLeft />
              </Button>
              <Button onClick={onNext} disabled={!hasMore}>
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CandidateList;
